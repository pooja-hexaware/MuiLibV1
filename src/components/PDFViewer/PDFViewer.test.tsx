import React,{useState} from "react";
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import PDFViewer from './PDFViewer';

describe('PdfViewer', () => {
    test('renders the PDF viewer component without errors', () => {
      render(<PDFViewer pdfFile="example.pdf" />);
  
      const pdfViewerComponent = screen.getByTestId('pdf-viewer');
      expect(pdfViewerComponent).toBeInTheDocument();
    });
  
    test('zooms in when the zoom in button is clicked', () => {
        render(<PDFViewer pdfFile="example.pdf" />);
    
        const zoomInButton = screen.getByTestId('zoom-in-button');
        fireEvent.click(zoomInButton);
    
        const zoomLevel = screen.getByTestId('zoom-level');
        expect(zoomLevel.textContent?.trim()).toMatch('150%');
      });

      test('zooms out when the zoom out button is clicked', () => {
        render(<PDFViewer pdfFile="example.pdf" />);
    
        const zoomOutButton = screen.getByTestId('zoom-out-button');
        fireEvent.click(zoomOutButton);
    
        const zoomLevel = screen.getByTestId('zoom-level');
        expect(zoomLevel.textContent?.trim()).toMatch('50%');
      });

      test('prints the PDF when Print button is clicked', () => {
        render(<PDFViewer pdfFile="example.pdf" />);
    
        const printButton = screen.getByTestId('print');
    
        const originalPrint = window.print;
        window.print = jest.fn();
    
        fireEvent.click(printButton);
    
        expect(window.print).toHaveBeenCalled();
    
        window.print = originalPrint;
      });
  });
