import React from 'react'

function ResultPdf() {
    
    const handleDownloadPdf = () => {
        fetch("SamplePDF.pdf").then((response) => {
            response.blob().then((blob) => {
            
                // Creating new object of PDF file
                const fileURL =
                    window.URL.createObjectURL(blob);
                    
                // Setting various property values
                let alink = document.createElement("a");
                alink.href = fileURL;
                alink.download = "SamplePDF.pdf";
                alink.click();
            });
        });
    };
  return (
    <div>
       <center>
                <h1>Welcome to Geeks for Geeks</h1>
                <h3>
                    Click on below button to download PDF
                    file
                </h3>
                <button onClick={handleDownloadPdf}>
                    Download PDF
                </button>
            </center>
    </div>
  )
}

export default ResultPdf
