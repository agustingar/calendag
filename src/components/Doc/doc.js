import React, { useState, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import pdfFile from './Los-derechos-asertivos.pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const Doc = () => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber ] = useState(1);

 
    const fetchNumPages = async () => {
      const response = await fetch(pdfFile);
      const buffer = await response.arrayBuffer();
      const pdf = await pdfjs.getDocument({ data: buffer });
      setNumPages(pdf.numPages);
    };





  return (
    <div>
      <Document file={pdfFile} onLoadSuccess={fetchNumPages} >
        <Page pageNumber={pageNumber} />
      </Document>
    </div>
  );
};

export default Doc;
