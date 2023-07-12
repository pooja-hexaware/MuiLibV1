import { useEffect } from "react"
import { Shortcut, EventType, ComboKey, ShortcutEvent } from '../MainMenu/types'

const ALLOWED_COMBO_KEYS = Object.keys(ComboKey)
const ALLOWED_EVENTS = Object.keys(EventType)
const EDITABLE_TAGS = ["INPUT", "TEXTAREA"]

const throwError = (message: string): void =>
    console.error(`Error thrown for useKeyboardShortcuts: ${message}`)

const allComboKeysPressed = (keys: string[], event: ShortcutEvent) => {
    if (keys.length !== 0) {
        keys = keys.map(key => key.toLowerCase())
        if (keys.includes("ctrl") && (!event.ctrlKey && !event.metaKey)) return false
        if (keys.includes("shift") && !event.shiftKey) return false
        if (keys.includes("alt") && !event.altKey) return false
    }
    return true
}

const validateKeys = (keys: string[]): boolean => {
    let errorMessage: string | null = null

    if (!keys.length)
        errorMessage = `You need to specify a key besides ${JSON.stringify(
            ALLOWED_COMBO_KEYS
        )} for keydown events.`
    if (keys.length > 1)
        errorMessage = `Only one key besides ${JSON.stringify(
            ALLOWED_COMBO_KEYS
        )} can be used. Found ${keys.length}: [${keys.map(key => `"${key}"`)}].`

    if (errorMessage) {
        throwError(errorMessage)
        return false
    }

    return true
}

const withoutComboKeys = (key: string) =>
    !ALLOWED_COMBO_KEYS.includes(key.toLowerCase())

const comboKeys = (key: string) =>
    ALLOWED_COMBO_KEYS.includes(key.toLowerCase())

const isSingleKeyEvent = (e: ShortcutEvent) =>
    !e.shiftKey && !e.metaKey && !e.altKey && !e.ctrlKey

const isSingleKeyShortcut = (shortcut: Shortcut) => {
    if (shortcut.keys)
        return !shortcut.keys.filter(comboKeys).length
}

const getKeyCode = (key: string) => {
    if (key.length === 1 && key.search(/[^a-zA-Z]+/) === -1)
        return `Key${key.toUpperCase()}`

    if (key.length === 1 && typeof Number(key) === "number") return `Digit${key}`

    return key
}

export const useKeyboardShortcuts = (
    shortcut: Shortcut[],
    active = true,
    dependencies: unknown[] = [],
    eventType: "keydown" | "wheel" = "keydown"
): void => {

    const shortcutHasPriority = (
        inputShortcut: Shortcut,
        event: ShortcutEvent
    ) => {
        if (shortcut.length === 1) return true
        if (isSingleKeyShortcut(inputShortcut) && isSingleKeyEvent(event))
            return true
        const shortcutPro = !shortcut.find(
            shortcutone => {
                // if (shortcutone.keys && shortcutone.keys.length !== 0 && inputShortcut.keys) {
                const shortcutoneLen = shortcutone.keys !== undefined ? shortcutone.keys.length : 0;
                const inputShortcutLen = inputShortcut.keys !== undefined ? inputShortcut.keys.length : 0;
                return allComboKeysPressed(shortcutone.keys !== undefined ? shortcutone.keys : [], event) &&
                    shortcutoneLen > inputShortcutLen
                // }
            }
        )
        return shortcutPro;
    }

    const callCallback = (shortcut: Shortcut, event: ShortcutEvent) => {
        if (event instanceof KeyboardEvent) {
            const keys = shortcut.keys !== undefined ? shortcut?.keys.filter(withoutComboKeys) : []
            const valid = validateKeys(keys)
            const singleKey =
                shortcut.keys !== undefined ? shortcut?.keys.length === 1 && shortcut?.keys[0] === event.key : []

            if (!valid || !(singleKey || getKeyCode(keys[0]) === event.code)) return
        }

        // If the targetted element is a input for example, and the user doesn't
        // press ctrl or meta or escape it probably means that they are trying to type in the
        // input field
        // @ts-ignore the tag name will be available
        const writing = EDITABLE_TAGS.includes(event.target && event.target["tagName"]) &&
            ("code" in event && event.code !== "Escape") &&
            !event.ctrlKey &&
            !event.metaKey

        const shouldExecAction =
            !shortcut.disabled &&
            !writing &&
            allComboKeysPressed(shortcut.keys !== undefined ? shortcut?.keys : [], event) &&
            shortcutHasPriority(shortcut, event)

        if (shouldExecAction) {
            event.preventDefault()
            shortcut.onEvent(event)
        }
    }

    const handleKeyboardShortcuts = (e: ShortcutEvent) =>
        shortcut.forEach(shortcut => callCallback(shortcut, e))

    const addEventListener = () =>
        document.addEventListener(eventType, handleKeyboardShortcuts, {
            passive: false,
        })

    const removeEventListener = () =>
        document.removeEventListener(eventType, handleKeyboardShortcuts)

    useEffect(() => {
        active ? addEventListener() : removeEventListener()
        return removeEventListener
    }, [active, ...dependencies])

    if (!shortcut || !shortcut.length)
        return throwError("You need to pass at least one shortcut as an argument.")

    // @ts-ignore
    if (!ALLOWED_EVENTS.includes(eventType))
        return throwError(
            `Unsupported event. Supported events are: ${JSON.stringify(
                ALLOWED_EVENTS
            )}. Found event: "${eventType}".`
        )

}