import React, { useState,useEffect,useRef } from 'react';
import { pdfjs, Document, Page } from 'react-pdf';
import Box from '@mui/material/Box';
import ToolBar from './ToolBar';
import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

function PDFViewer(props : any) {
  const [totalPages, setTotalPages] = useState(0);
  const [pageScale, setPageScale] = useState(1.5);
  const [file, setFile] = useState<string>(props.file);
  const [currentPage, setCurrentPage] = useState(1);
  const [inputKey, setInputKey] = useState(0);
  const [rotation, setRotation] = useState<number>(0);



  const viewerRef = useRef<HTMLDivElement>(null);

 const  onDocumentLoadSuccess = ({ numPages } : any) => {
    setTotalPages(numPages);
  }

 const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

 const handleGoToPage = (pageNumber: number) => {
    if (!isNaN(pageNumber) && pageNumber >= 1) {
      setCurrentPage(pageNumber);
      setInputKey(inputKey + 1); 
    }
  };

  const handleZoomIn = () => {
    setPageScale(pageScale + 0.5);
  };

  const handleZoomOut = () => {
    if (pageScale > 0.1) {
      setPageScale(pageScale - 0.5);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    if(file){
      const downloadLink = document.createElement('a');
      downloadLink.href = file;
      downloadLink.download = 'cv.pdf';
      downloadLink.click();
    }
  };

  const handleonZoomChange = (pageZoom : number) => {
    if(pageZoom !== null && pageZoom !== undefined) 
    setPageScale(pageZoom);
  };

  const handleRotateCounterClockwise = () => {
    setRotation(prevRotation => (prevRotation - 90) % 360);
  };

  return (
   <>
   <Box>
    <div id="ToolBarReactPdfViewer">
    <ToolBar
          scale={pageScale}
          inputKey={inputKey} 
          currentPage={currentPage}
          numPages={totalPages}
          onPageChange={handlePageChange}
          onGoToPage={handleGoToPage}
          onZoomIn={handleZoomIn}
          onZoomOut={handleZoomOut}
          onPrint={handlePrint}
          onDownload={handleDownload}
          onZoomChange={handleonZoomChange}
          onRotateCounterClockWise={handleRotateCounterClockwise}
        />
     </div>
      <PerfectScrollbar>
          <div data-testid="pdf-viewer" ref={viewerRef} style={{ width: '100%', height: 'calc(100vh - 64px)', justifyContent: 'center', display: 'flex' }}>
            <Document  file={file} onLoadSuccess={onDocumentLoadSuccess} options={{ cMapUrl: 'cmaps/', cMapPacked: true }}>
                    <Page pageNumber={currentPage} 
                    scale={pageScale}  
                    renderTextLayer={false} 
                    renderAnnotationLayer={false}
                    rotate={rotation}
                     />
            </Document>
          </div>
      </PerfectScrollbar>
    </Box>
   </>
  );
}

export default PDFViewer;