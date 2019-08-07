<script>
  import jsPDF from "jspdf";
  import html2canvas from "html2canvas";

  function exportToPDF() {
    const invoice = document.getElementById("invoice");

    html2canvas(invoice).then(canvas => {
      const img = canvas.toDataURL("image/png", 1.0);
      const doc = new jsPDF("p", "px", "a4");
      doc.addImage(img, "JPEG", 30, 30);
      doc.save("a4.pdf");
    });
  }
</script>

<button on:click={exportToPDF}>Export</button>
