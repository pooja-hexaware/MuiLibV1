### mui-components library

##### Button

* Button with label & icons

```
<Button 
    label="Download" variant="contained" size="medium"
    startIcon ={ <Download width={17} height={17}/>}
/>
```

Output:                         ![](assets/20230426_091902_button.PNG)

to refer other properties of Button: [(https://mui.com/material-ui/react-button/)]

---

##### DataGrid

If data response is to be loaded, api url can be passed to the DataGrid component

*url should have response in the format {"data":[{"id":1, "name":"Sample1"},{"id":2, "name":"Sample2"}],"totalRownCount": 2 }*

To enable server-side pagination in the component, pass paginationMode as server

colId attribute marks the unique column for grid rows

```
const [paginationModel, setPaginationModel] = useState({
          pageSize: 10,
          page: 1 });

const columns = [ { field: '_id', headerName: 'id', flex: 0.8 }, 
                  { field: 'name', headerName: 'name', flex: 1 }, 
                  { field: 'username', headerName: 'username', flex: 1 }, 
                  { field: 'email', headerName: 'email', flex: 1 } ];

<DataGrid sx={{ height: 300, width: '100%', borderColor: 'primary.light' }} 
    url="https://app-dotnetci-test.azurewebsites.net/user" 
    columns={columns} 
    colId="_id" 
    paginationModel={paginationModel} 
   pageSizeOptions={[1, 2, 5]} 
paginationMode='server' />
```

Output:

![](assets/20230424_153715_dataGrid.PNG)

---

##### CheckboxGroup

```
  const [checked, setChecked] = useState(true);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setChecked(event.target.checked);
    };

<CheckboxGroup grouplabel="CheckBox Group" sx={{ m: 3 }} >
        <Checkbox size="small" color="success" onChange={handleChange} checked={checked} 
                      inputProps={{ 'aria-label': 'controlled' }} label= "CheckBox1"/>
        <Checkbox size="small" color="secondary" label= "CheckBox2"/>
        <Checkbox size="small" color="default" label= "CheckBox3"/>
        </CheckboxGroup>
```

Output:                           ![](assets/20230424_105352_checkbox.PNG)

---

##### Checkbox

```
 <Checkbox 
   size="small" color="secondary" checked label="CheckBox2"
 />
```

Output:                        ![](assets/20230424_105418_checkbox1.PNG)

to refer other properties of Checkbox: [(https://mui.com/material-ui/react-checkbox/)]

---

##### RadioButton

```
<RadioButton label="Gender"
    items={Items} itemLabel="gender" itemValue="_id"
    size="small" color="secondary" value='female'
/>
```

Output:                        ![](assets/20230424_105448_radioButtonExample.PNG)

to refer other properties of RadioButton: [(https://mui.com/material-ui/react-radio-button/)]

---

##### DateTimePicker

* It enables selecting date & time by default

  ```
  <DateTimePicker 
        defaultValue={dayjs('2022-04-24T16:30')} >
  </DateTimePicker>

  ```

  Output:        ![](assets/20230424_170410_dateTimePicker.PNG)
* To enable only date, pass type="date"

  ```
  <DateTimePicker  
           type="date" 
          defaultValue={dayjs('2022-04-24T16:30')} >
  </DateTimePicker>
  ```

Output:         ![](assets/20230424_171220_datePicker.PNG)

* To enable only time picker, pass type="time"

  ```
   <DateTimePicker 
            type="time" 
           defaultValue={dayjs('2022-04-24T16:30:30')} 
           format="HH:mm:ss">
  </DateTimePicker>

  ```

Output:          ![](assets/20230424_171618_timePicker.PNG)

to refer other properties:

---

##### MultiSelectDropDown

* It enables selecting options from url
  *optionId & optionLabel must be mestioned if url is provided*

It avails autocomplete feature for seleting options

```
<MultiSelectDropDown 
      style={{ width: "300px", marginLeft: "50px" }}
      label="select usernames" 
      url="https://app-dotnetci-test.azurewebsites.net/user/getAllUser/userList"
        optionId="_id"
        optionLabel="username"  
/>
```

Output:         ![](assets/20230425_120908_multiSelect.png)

to refer other properties:  [(https://mui.com/material-ui/react-select/#advanced-featuresto)]

---

##### Alert

* displays a short, important message

```
  <Alert 
  severity="success" color="info" sx={{width:"300px"}}>
      This is an success alert — check it out!
  </Alert>

```

Output:            ![](assets/20230425_141747_Alert.PNG)

to refer other properties: [(https://mui.com/material-ui/react-alert/)]

---

##### Tab

* allows navigation between groups of content

  ```
  const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
      setValue(newValue);
    };


  <Tabs sx={{marginTop: "25px"}}
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="inherit"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="Item One" />
          <Tab label="Item Two" />
          <Tab label="Item Three" />
        </Tabs>
        <TabPanel value={value} index={0}>
          Item One

        </TabPanel>
        <TabPanel value={value} index={1}>
          Item Two

        </TabPanel>
        <TabPanel value={value} index={2}>
          Item Three

        </TabPanel>
  ```

  Output:

  ![](assets/20230425_144343_Tabs.PNG)

to refer other properties: [(https://mui.com/material-ui/react-tabs/)]

---

##### Accordion

* allows the user to show and hide sections of related content

  ```
        <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          {" "}
          <Typography>Accordion 1</Typography>{" "}
        </AccordionSummary>{" "}
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.{" "}
          </Typography>{" "}
        </AccordionDetails>{" "}
      </Accordion>{" "}
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>Accordion 2</Typography>{" "}
        </AccordionSummary>{" "}
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.{" "}
          </Typography>{" "}
        </AccordionDetails>{" "}
      </Accordion>{" "}
      <Accordion disabled>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3a-content"
          id="panel3a-header"
        >
          <Typography>Disabled Accordion</Typography>{" "}
        </AccordionSummary>{" "}
      </Accordion>{" "}
  ```

  Output:

  ![](assets/20230425_154210_accordian.PNG)

  for further reference: [(https://mui.com/material-ui/react-accordion/)]

---
