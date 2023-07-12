import React, {useState} from 'react'
import {Paper, Chip} from '@mui/material'
import { styled } from '@mui/material/styles';
import './FileDrop.css'

const ListItem = styled('li')(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

export const getFileExtension = (fileName: any) => {
  let fileExt = "";
  var nameArr = fileName.split(".");
  if (nameArr.length !== 1 && (nameArr.length !== 2 || nameArr[0] !== "")) {
      fileExt = nameArr.pop();
  }
  return fileExt;
}

export type FileUploadProps = {
  imageButton?: boolean
  accept: string
  hoverLabel?: string
  dropLabel?: string
  width?: string
  height?: string
  backgroundColor?: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  onDrop: (event: React.DragEvent<HTMLElement>) => void
}

const ReactUpload: React.FC<FileUploadProps> = ({
  accept,
  imageButton = false,
  hoverLabel = 'Click or drag to upload file',
  dropLabel = 'Drop file here',
  width = '600px',
  height = '100px',
  backgroundColor = '#fff',
  onChange,
  onDrop,
}) =>{
    const [uploadedFiles, setUploadedFiles] : any[] = useState([]);
    const [rejectedFiles, setRejectedFiles] : any[] = useState([]);
    const [enableUploadButton, setEnableUploadButton] = useState(false);
    const [labelText, setLabelText] = React.useState<string>(hoverLabel)
    const [isDragOver, setIsDragOver] = React.useState<boolean>(false)
    const [isMouseOver, setIsMouseOver] = React.useState<boolean>(false)

    const calcSize = (size: any | Number) => {
      return Math.fround(size / 1024 / 1024).toFixed(1);
    };

    const validateFile= (file: any) => {
      let whiteList = accept.split(",").map((i:any) => (i.replace(".","")));
      console.log("whiteList", whiteList)
      if (!Array.isArray(whiteList) || whiteList.length === 0) {
          return false;
      }
      let fileExt = getFileExtension(file.name);
      if (fileExt === "" || whiteList.findIndex(item => item.toLowerCase() === fileExt.toLowerCase()) === -1) {
          file['error'] = 'Please select a valid file type. Only .jpg, .jpeg, .gif, .tiff, .bmp, .pdf, .doc, .docx, .xlsx, and .txt file types are allowed';
          return false;
      }
      return true;
  }
    const stopDefaults = (e: React.DragEvent | any) => {
      e.stopPropagation()
      e.preventDefault()

  }
    const dragEvents = {
      onMouseEnter: () => {
          setIsMouseOver(true)
      },
      onMouseLeave: () => {
          setIsMouseOver(false)
      },
      onDragEnter: (e: React.DragEvent) => {
          stopDefaults(e)
          setIsDragOver(true)
          setLabelText(dropLabel)
      },
      onDragLeave: (e: React.DragEvent) => {
          stopDefaults(e)
          setIsDragOver(false)
          setLabelText(hoverLabel)
      },
      onDragOver: stopDefaults,
      onDrop: (e: React.DragEvent<HTMLElement> | any) => {
          stopDefaults(e)
          setLabelText(hoverLabel)
          setIsDragOver(false)
          if (e.dataTransfer.files[0]) {
            let chosenFiles =[]
            onChange(e)
            let tempRejected = [];
            let idStart = e.dataTransfer.files?.length;
            const files = e.dataTransfer.files;
            if (files?.length) {
              for (let i = 0; i < files.length; i++) {
                files[i]['id'] = idStart++;
               validateFile(files[i]) ? chosenFiles.push(files[i])  :tempRejected.push(files[i]);
            }
              setRejectedFiles(tempRejected);
            }
          handleUploadFiles(chosenFiles);
          }
          onDrop(e)
      },
  }
    const handleFileEvent = (e: any | React.ChangeEvent<HTMLInputElement>) => {
      // const chosenFiles = Array.prototype.slice.call(e.target.files);
      let chosenFiles =[]
        onChange(e)
        let tempRejected = [];
        let idStart = e.target.files?.length;
        const files = e.target.files;
        if (files?.length) {
          debugger
          for (let i = 0; i < files.length; i++) {
            files[i]['id'] = idStart++;
           validateFile(files[i]) ? chosenFiles.push(files[i])  :tempRejected.push(files[i]);
        }
          setRejectedFiles(tempRejected);
        }
        handleUploadFiles(chosenFiles);
      };

      const totalSize: any = (selectedFiles: any) => {
        return calcSize(
          selectedFiles.reduce(
            (total: any, currentValue: any) => (total = total + currentValue.size),
            0
          )
        );
      };

      const fileRemove = (file: any ) => {
        debugger
        const updatedList = [...uploadedFiles];
        updatedList.splice(uploadedFiles.indexOf(file), 1);
        setUploadedFiles(updatedList);
        if (updatedList.length === 0 && totalSize(updatedList) > 15) {
          setEnableUploadButton(false);
        } else {
          setEnableUploadButton(true);
        }
      };

      const handleUploadFiles = (files: any[] | any) => {
        const uploaded: any[] = [...uploadedFiles];
        for(let i=0 ; i< files.length; i++){
          if (uploaded.findIndex((f: any) => f?.name === files[i].name) === -1) {
            if (totalSize(uploaded) <= 15) {
              uploaded.push(files[i]);
              setEnableUploadButton(true);
              setUploadedFiles(uploaded);
            } else {
              alert(
                    "Exceeds Size limit of 15MB combining all the files"
              );
              setEnableUploadButton(false);
            }
          }
        }
      };

    return(

        <span style={{width :'600px', height :'auto',
        cursor: "pointer", alignItems: "center"}}>
          <span>
          <input
              style={{ display: 'none'}}
                  type="file"                  
                  id="fileUpload"
                  name="fileUpload"
                  accept={accept}
                  multiple
                  onChange={handleFileEvent}
                />
 <label  style={{width :'450px', height :'65px', paddingTop: '45px', paddingLeft:'65px',
     margin: 0, cursor: "pointer", border: '1px dashed grey', textAlign: 'center', display: 'flex'}}
                  className="root"
                  htmlFor="fileUpload"
            {...dragEvents}
            >
              <div >
              Drag and drop files or click to select
              </div>
 </label>
                   </span>

            {rejectedFiles.length > 0 &&
                <div className="rejected-file-summary" style={{color:"#ff0000"}}>
                Please select a valid file type. Only {accept} are accepted
                </div>
            }

          {uploadedFiles?.length > 0 &&  <Paper  sx={{
        width: '513px',  display: 'flex',
        flexWrap: 'wrap', listStyle: 'none', p: 0.5, m: 0}}
      component="ul" id="attachment_files">
                    {uploadedFiles?.map((file: any, index: any) => {
                    return (           
                    <ListItem key={index}>
                    <Chip label={file?.name} 
                onDelete={()=>{ fileRemove(file)}} 
                    />
                    </ListItem>
                    );
                    })} 
            </Paper>}
        </span>
    )
}

export default ReactUpload