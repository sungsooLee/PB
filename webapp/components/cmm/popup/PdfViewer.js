import { BaseModule } from "/components/cmm/BaseModule.js";
import GlobalApp from "/components/cmm/GlobalApp.js";

export class PdfViewer extends BaseModule {
  constructor(elem) {
    super(elem);
  }

  init(param) {
    super.init(this);
    this.load(param);
  }

  /**
   * 화면 접근 시, 실행
   */
  async load(obj) {
    await this.handlePdfView(obj);
  }

  /**
   * PDF 가져오기
   */
  async handlePdfView(obj) {
    const param = {
      pdfName: obj.fileName + ".pdf",
    };

    const result = await ApiUtils.sendGet("/api/file/getPdfViewer.json", param);
    document.getElementById("pdfForm").src =
      "../../resources/js/pdfJs/web/viewer.html?file=/api/file/getPdfViewer.json?pdfName=" +
      obj.fileName +
      ".pdf";
  }

  destroy() {
    super.destroy(this);
  }
}
