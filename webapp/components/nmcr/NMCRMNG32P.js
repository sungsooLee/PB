/*************************************************************************
 * @ 서비스경로 : NMCRMNG32P
 * @ 파일명      : NMCRMNG32P.js 고객명함 관리 - 지점 명함첩 - 수정
 * @ 화면ID 	 : PBWBU089900
 * @ 작성자      : 90194835
 * @ 작성일      : 2024-12-11
 ************************** 수정이력 ****************************************
 * 날짜                    작업자                 변경내용
 *_________________________________________________________________________
 * 2024-12-11            윤은정                 최초작성
 *************************************************************************/
import { BaseModule } from "../cmm/BaseModule.js";
import GlobalApp from "/components/cmm/GlobalApp.js";

let photo_file = "";

export class NMCRMNG32P extends BaseModule {
  constructor(elem) {
    super(elem);
    this.elem = elem;
    this.callbackFunc = null;

    [this.beData, this.setBeData] = this.useState("beData", ""); // 기존데이터

    [this.mNmcrMngNo, this.setMnmcrMngNo] = this.useState("mNmcrMngNo", ""); // 관리번호
    [this.mNmcrNm, this.setMnmcrNm] = this.useState("mNmcrNm", ""); // 이름
    [this.mFavtUsgYn, this.setMfavtUsgYn] = this.useState("mFavtUsgYn", ""); // 키맨
    [this.mNmcrComNm, this.setMnmcrComNm] = this.useState("mNmcrComNm", ""); // 회사
    [this.mNmcrHpNo, this.setMnmcrHpNo] = this.useState("mNmcrHpNo", ""); // 휴대폰번호
    [this.mNmcrDepNm, this.setMnmcrDepNm] = this.useState("mNmcrDepNm", ""); // 부서
    [this.mNmcrDtsNm, this.setMnmcrDtsNm] = this.useState("mNmcrDtsNm", ""); // 직책
    [this.mNmcrEmail, this.setMnmcrEmail] = this.useState("mNmcrEmail", ""); // 이메일
    [this.mNmcrInlxNo, this.setMnmcrInlxNo] = this.useState("mNmcrInlxNo", ""); // 전화번호
    [this.mNmcrFaxNo, this.setMnmcrFaxNo] = this.useState("mNmcrFaxNo", ""); // 팩스번호
    [this.mAdr, this.setMadr] = this.useState("mAdr", ""); // 주소

    [this.mAtflNo, this.setMatflNo] = this.useState("mAtflNo", ""); // 파일ID
    [this.mAtflNm, this.setMatflNm] = this.useState("mAtflNm", ""); // 파일명
    [this.mFileNm, this.setMfileNm] = this.useState("mFileNm", ""); // 파일명
    [this.mFileSize, this.setMfileSize] = this.useState("mFileSize", ""); // 파일사이즈
    [this.mFileYn, this.setMfileYn] = this.useState("mFileYn", ""); // 파일여부확인
    [this.mImgType, this.setMimgType] = this.useState("mImgType", ""); // 파일확장자
    [this.mFullNm, this.setMfullNm] = this.useState("mFullNm", ""); // 파일FULL경로
    [this.filePath, this.setFilePath] = this.useState("filePath", "NMCR"); // 파일폴더경로

    [this.mPhotoFile, this.setMphotoFile] = this.useState("mPhotoFile", ""); //
    [this.mFileChgYn, this.setMfileChgYn] = this.useState("mFileChgYn", "N"); // 파일수정여부

    /**
     * nativeUtils.handleNativeResponse 로 응답 받은 내용을 eventDispatcher 통하여 전달 받음
     * @param event
     */
    const handleNativeResponse = (event) => {
      const response = event.detail;
      console.log("handleNativeResponse!!!!!!!!: ", response);

      this.nativeImageSetting(response);
    };

    this.nativeCallback = handleNativeResponse;

    // 응답 callback 함수 리스터 등록
    NativeUtils.subscribe(handleNativeResponse);
  }

  init(param, callbackFunc) {
    super.init(this);

    this.callbackFunc = callbackFunc;

    this.setBeData(param); // 기존데이터
    this.setMnmcrMngNo(param.nmcrMngNo); // 관리번호
    this.setMnmcrNm(param.nmcrNm); // 이름
    this.setMfavtUsgYn(param.favtUsgYn); // 키맨
    this.setMnmcrComNm(param.nmcrComNm); // 회사
    this.setMnmcrHpNo(param.nmcrHpNo); // 휴대폰번호
    this.setMnmcrDepNm(param.nmcrDepNm); // 부서
    this.setMnmcrDtsNm(param.nmcrDtsNm); // 직책
    this.setMnmcrEmail(param.nmcrEmail); // 이메일
    this.setMnmcrInlxNo(param.nmcrInlxNo); // 전화번호
    this.setMnmcrFaxNo(param.nmcrFaxNo); // 팩스번호
    this.setMadr(param.adr); // 주소
    this.setMatflNo(param.atflNo); // 파일ID
    this.setMatflNm(param.atflNm); // 파일명
    this.setMfileNm(param.orcpAtflNm); // 파일명
    this.setMfileSize(param.fileSize); // 파일사이즈
    this.setMfileYn(param.atflNo != "" ? "Y" : "N"); // 파일여부확인
    this.setMimgType(param.enlpeNm); // 파일확장자
    this.setMfullNm(param.fullNm); // 파일FULL경로

    this.register(param);
  }

  register(param) {
    this.bind("mNmcrNm", $$("#mNmcrNm"), "input");
    this.bind("mNmcrComNm", $$("#mNmcrComNm"), "input");
    this.bind("mNmcrHpNo", $$("#mNmcrHpNo"), "input");
    this.bind("mNmcrDepNm", $$("#mNmcrDepNm"), "input");
    this.bind("mNmcrDtsNm", $$("#mNmcrDtsNm"), "input");
    this.bind("mNmcrEmail", $$("#mNmcrEmail"), "input");
    this.bind("mNmcrInlxNo", $$("#mNmcrInlxNo"), "input");
    this.bind("mNmcrFaxNo", $$("#mNmcrFaxNo"), "input");
    this.bind("mAdr", $$("#mAdr"), "input");

    if (this.mFullNm.value != null && this.mFullNm.value != "") {
      $$("#no_img").hide();
      $$("#yes_img").show();

      const time = dayjs().format("YYYYMMDDHHmmss");
      const imgNm =
        "/api/file/getFileView?fileName=" +
        this.mAtflNm.value +
        "&fileType=NMCR&time=" +
        time;

      $("#card_img").attr("src", imgNm);
      //			$('#fileUploadId').val(this.mFullNm.value);
      $("#card_img_s").attr("srcset", imgNm);
    } else {
      $$("#no_img").show();
      $$("#yes_img").hide();
    }

    if (this.mFavtUsgYn.value === "Y") {
      $("#mFavtUsgYn").attr("checked", true);
    }

    $("input").on("keyup", async (e) => await this.handleInputClick(e)); // 필수 값 체크 후 등록버튼 활성화 처리
    $(".input-remove").on(
      "click",
      async (e) => await this.handleInputDelClick(e),
    ); // X버튼 클릭시, 데이터 지움.
    $$("#mNmcrEmail").on("focusout", async (e) => await this.validateEmail(e)); // 메일형식 체크
    $$("#mNmcrHpNo").on("focusout", async (e) => await this.validateHpNum(e));

    $$("#btnDelImg").on("click", async () => await this.handleImgDelClick()); // 이미지 삭제
    $$("#btnGallery").on(
      "click",
      async () => await this.handleGalleryInfoClick(),
    ); // 명함 촬영   >> 갤러리 btnGallery
    $$("#btnCamera").on(
      "click",
      async () => await this.handleCameraInfoClick(),
    ); // 명함 촬영   >> 카메라 btnCamera

    $$("#fileUploadId").on(
      "change",
      async () => await this.handleGalleryClick(),
    ); // 갤러리 업로드
    //		$$('#cameraUploadId').on('change', async () => await this.handleCameraClick());				// 카메라 업로드
    $$("#btnSave").on("click", async () => await this.handleNmcrModClick()); // 수정

    if (param.isMyRegister === "Y") {
      $("input[name=radio_only_me_view_yn]").on(
        "click",
        async () => await this.handleOnlyMeViewRadioClick(),
      ); //명함 나만보기
    } else {
      $$("#formMt16").hide();
    }
    $('input[name="hdnYn"]').on(
      "click",
      async () => await this.handleOnlyMeMemoCheckClick(),
    );
  }

  /**
   *  이메일형식확인
   * @param
   */
  async validateEmail(e) {
    const mailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const mail = e.target.value;

    if (!mailPattern.test(mail)) {
      $$("#mMailFrm").addClass("form-invalid");
    }
  }

  /**
   *  핸드폰번호 확인
   * @param
   */
  async validateHpNum(e) {
    const inputVal = e.target;
    const inputLen = inputVal.value.length;

    if (inputLen < 11) {
      $$("#hpForm").addClass("form-invalid");
    }
  }

  /**
   *  필수값 확인
   * @param
   */
  async handleInputClick(e) {
    const inputTxt1 = this.mNmcrNm.value;
    const inputTxt2 = this.mNmcrComNm.value;
    let inputTxt3 = this.mNmcrHpNo.value;

    const inputVal = e.target;
    if (inputVal.id === "mNmcrHpNo") {
      inputVal.value = inputVal.value.replace(/[^0-9]/g, "");
      $$("#hpForm").removeClass("form-invalid");
      inputTxt3 = inputVal.value;
    }

    if (inputVal.id === "mNmcrFaxNo") {
      inputVal.value = inputVal.value.replace(/[^0-9]/g, "");
    }

    const inputMaxLen = $(e.target).attr("maxlength");
    const inputLen = e.target.value.length;

    if (inputLen > inputMaxLen) {
      return false;
    }

    if (e.target.id === "mNmcrEmail") {
      $$("#mMailFrm").removeClass("form-invalid");
    }

    if (
      inputTxt1 &&
      inputTxt2 &&
      inputTxt3.length === 11 &&
      this.mFileYn.value === "Y"
    ) {
      $$("#btnSave").addAttr("aria-disabled", false);
    } else {
      $$("#btnSave").addAttr("aria-disabled", true);
    }
  }

  /**
   *  input X버튼 클릭시, 데이터 지움.
   * @param
   */
  async handleInputDelClick(e) {
    // bind된 key값 가져오기
    const inputKey = $(e.target)
      .closest("div")
      .children("input")
      .attr("data-bind");
    // 데이터 초기화
    this.resetField(inputKey);
    this.handleInputClick();
  }

  /**
   *  명함이미지 삭제 데이터 초기화
   * @param
   */
  async handleImgDelClick() {
    const alertRes = await CmmUtils.confirm("삭제하시겠습니까?", "", {
      okLabel: "예",
      noLabel: "아니요",
      icon: "caution",
    });
    if (alertRes.resultCd === "000000") {
      toastr.success(``, "삭제 되었습니다.");
    } else {
      return false;
    }

    $("#card_img").attr("src", "");
    $("#card_img_s").attr("srcset", "");
    $("#fileUploadId").val("");
    $("#cameraUploadId").val("");
    $("#no_img").show();
    $("#yes_img").hide();
    this.setMphotoFile("");
    this.setMfileYn("N");
    this.handleInputClick(); // 필수값체크
  }

  /**
   *  명함이미지 갤러리 선택
   * @param
   */
  async handleGalleryInfoClick() {
    $("#fileUploadId").trigger("click");
  }

  /**
   *  명함이미지 카메라 선택
   * @param
   */
  async handleCameraInfoClick() {
    const result = await Swal.fire({
      showCloseButton: true,
      reverseButtons: true,
      confirmButtonText: `<i class='ico-check'></i>확인`,
      customClass: {
        htmlContainer: "mt40",
        actions: "btn-wrap pt40",
        cancelButton: "btn-large btn-outlined",
        confirmButton: "btn-large btn-primary inflex",
      },
      buttonsStyling: false,
      html: `
                <i class="icon-only icon-48 icon-camera bg-icon-gray_1"></i>
                <strong class="title-large mt8">명함 촬영 안내</strong>
                <p class="body-large mt8">휴대폰 세로 모드로 촬영하세요.</p>
                <picture class="d-flex j-center mt16">
                    <source srcset="../../resources/images/PBWBU/img_bc_info.svg">
                    <img src="../../resources/images/PBWBU/img_bc_info.svg" alt="">
                </picture>
            `,
    });
    if (result.isConfirmed) {
      console.log("카메라 선택 안내 콜백 영역");

      const res = await NativeUtils.callCropImageScan();
    }
  }

  /**
   *  카메라 실행 후 처리
   * @param
   */
  async nativeImageSetting(res) {
    const confData = await ApiUtils.sendGet("/api/file/getConfig");
    const maxFileSize = parseFloat(confData.data.maxFileSize);
    const maxRequestSize = parseFloat(confData.data.maxRequestSize);

    let type = "";
    if (EnvUtils.isIOS()) {
      const imgStr = "data:image/jpeg;base64," + res.data.split(",")[2];
      $("#card_img").attr("src", imgStr);

      type = res.data.split(",")[1];
      this.setMimgType($.trim(type));
      res = imgStr;
    } else {
      $("#card_img").attr("src", res);
      const regex = /^data:image\/(png|jpeg|jpg);base64,/;
      const match = res.match(regex);
      const type = match[1];
      this.setMimgType(type);
    }

    if ($.inArray(this.mImgType.value, ["jpg", "jpeg", "png"]) === -1) {
      const result = CmmUtils.alert("", "등록 가능한 확장자가 아닙니다.", {
        btnLabel: "확인",
        icon: "caution",
      });
      return false;
    }

    const fileSize = (res.length * 3) / 4; // Base64 데이터 길이를 계산 후 파일 크기를 측정 Byte
    // Byte > KB
    const fileSizeKB = fileSize / 1024;
    const fileSizeMB = fileSizeKB / 1024;

    if (fileSizeMB > maxFileSize) {
      const result = CmmUtils.alert(
        "",
        `파일 크기가 ${maxFileSize} MB를 초과하였습니다.`,
        {
          btnLabel: "확인",
          icon: "caution",
        },
      );
      return false;
    }
    this.setMfileSize(fileSize);

    if (!this.mFileNm.value) {
      this.setMfileNm("cptured_image." + this.mImgType);
    }
    this.extImageYn("Y");
    this.setMfileYn("Y");
    this.setMfileChgYn("Y");

    photo_file = await this.base64ToFile(
      res,
      this.mFileNm.value,
      this.mImgType,
    );

    const fileInput = document.getElementById("fileUploadId");
    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(photo_file);
    fileInput.files = dataTransfer.files;

    this.handleInputClick(); // 필수값체크
  }

  /**
   *  네이티브에서 전달된 base64 데이터를 File형식으로 변경
   * @param
   */
  async base64ToFile(base64Data, fileName, type) {
    var bstr = atob(base64Data.split(",")[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n),
      fname = fileName,
      ftype = "image/" + type;

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], fname, { type: ftype });
  }

  /**
   *  명함이미지 등록 처리
   * @param
   */
  extImageYn(imageYnVal) {
    if (imageYnVal === "N") {
      $("#card_img").attr("src", ""); //이미지
      //				$("#card_detail_img").attr("src","");	//상세 이미지
      $("#no_img").show(); //이미지
      $("#yes_img").hide();
    } else {
      $("#no_img").hide();
      $("#yes_img").show();
    }
  }

  /**
   *  명함이미지 파일 업로드 확인(갤러리)
   * @param
   */
  async handleGalleryClick() {
    const fileArry = event.target.files;

    const confData = await ApiUtils.sendGet("/api/file/getConfig");
    const maxFileSize = parseFloat(confData.data.maxFileSize);
    const maxRequestSize = parseFloat(confData.data.maxRequestSize);

    let ttlFileSize = 0;
    for (let i = 0; i < fileArry.length; i++) {
      const file = fileArry[i];
      this.setMfileNm(file.name);

      const type = file.type;
      this.setMimgType(type.substr(type.indexOf("/") + 1));

      if ($.inArray(this.mImgType.value, ["jpg", "jpeg", "png"]) === -1) {
        const result = CmmUtils.alert("", "등록 가능한 확장자가 아닙니다.", {
          btnLabel: "확인",
          icon: "caution",
        });
        return false;
      }

      if (CmmUtils.parseSizeToBytes(file.size) > maxFileSize) {
        const result = CmmUtils.alert(
          "",
          `파일 크기가 ${maxFileSize} MB를 초과하였습니다.`,
          {
            btnLabel: "확인",
            icon: "caution",
          },
        );
        return false;
      }
      this.setMfileSize(file.size);

      ttlFileSize += file.size;

      if (i === fileArry.length - 1) {
        log.debug("ttlFileSize : ", CmmUtils.parseSizeToBytes(ttlFileSize));
        if (CmmUtils.parseSizeToBytes(ttlFileSize) > maxRequestSize) {
          const result = CmmUtils.alert(
            "",
            `전체 파일 크기가 ${maxRequestSize} MB를 초과하였습니다.`,
            {
              btnLabel: "확인",
              icon: "caution",
            },
          );
          return false;
        }
      }
    }

    //이미지 로드
    const reader = new FileReader();
    reader.onload = function (e) {
      $("#card_img").attr("src", e.target.result);
    };

    reader.readAsDataURL(fileArry[0]);
    this.extImageYn("Y");
    this.setMfileYn("Y");
    this.handleInputClick(); // 필수값체크
    this.setMfileChgYn("Y");
  }

  /**
   *  수정 이벤트 및 부모창 리턴
   * @param
   */
  async handleNmcrModClick() {
    const hasCls = $("#btnSave").attr("aria-disabled");
    if (hasCls === "true") {
      // 저장 가능 상태 확인
      return false;
    }

    let resCode = "";
    let resMessage = "";
    let fileSend = "Y";
    if (this.mFileChgYn.value === "Y") {
      let res = "";
      const params = {
        fileNm: this.mFileNm.value,
        filePath: this.filePath.value,
        fileType: this.mImgType.value,
        fileAtflNm: this.mAtflNm.value,
      };

      const fileInput = document.getElementById("fileUploadId");
      const files = fileInput.files;
      res = await ApiUtils.uploadFile(files, params);

      if (res.resultCode !== "000000") {
        fileSend = "N";
        toastr.error(``, res.resultMessage);
        return false;
      }
    }

    if (fileSend === "Y") {
      const res = await this.nameCardRegist();
      if (res.resultCode === "000000") {
        toastr.success("", "저장 되었습니다.");
        setTimeout(() => {
          this.callbackFunc({ resultCd: "000000", resultMsg: "SUCCESS" });
        }, 2000);
      } else {
        toastr.error(``, res.resultMessage);
        return false;
      }
    }
  }

  /**
   * 명함유형 선택시
   * @param
   */
  async handleOnlyMeViewRadioClick() {
    if ($("input[name=radio_only_me_view_yn]:checked").val() == "Y") {
      $('input[name="hdnYn"]').prop("checked", true);
    } else {
      $('input[name="hdnYn"]').prop("checked", false);
    }
  }

  /**
   * 메모 클릭시
   */
  async handleOnlyMeMemoCheckClick() {
    if ($("input[name=radio_only_me_view_yn]:checked").val() == "Y") {
      $('input[name="hdnYn"]').prop("checked", true);
    }
  }

  /**
   *  고객명함수정 - 파일 업로드 후, 고객정보 및 파일정보 수정
   * @param
   */
  async nameCardRegist() {
    const isOnlyMeView = $("input[name=radio_only_me_view_yn]:checked").val();
    const usgYn = $("#mFavtUsgYn").is(":checked") === true ? "Y" : "N";

    const url = "/pb/api/nmcr/cus/modNmcrCus.json";
    const params = {};
    params.favtUsgYn = usgYn;
    params.nmcrMngNo = this.mNmcrMngNo.value;
    params.nmcrNm = this.mNmcrNm.value;
    params.nmcrComNm = this.mNmcrComNm.value;
    params.nmcrHpNo = this.mNmcrHpNo.value;
    params.nmcrDepNm = this.mNmcrDepNm.value;
    params.nmcrDtsNm = this.mNmcrDtsNm.value;
    params.nmcrEmail = this.mNmcrEmail.value;
    params.nmcrInlxNo = this.mNmcrInlxNo.value;
    params.nmcrFaxNo = this.mNmcrFaxNo.value;
    params.adr = this.mAdr.value;
    params.atflNo = this.mAtflNo.value;
    params.fileNm = this.mFileNm.value;
    params.fileSize = this.mFileSize.value;
    params.imgType = this.mImgType.value;
    params.fileChgYn = this.mFileChgYn.value;
    params.atflNm = this.mAtflNm.value;
    params.beData = this.beData.value; // 로그 남기기 위한 기존 데이터
    params.onlyMeView = isOnlyMeView;

    const res = await ApiUtils.sendPost(url, params);

    return res;
  }

  destroy() {
    super.destroy(this);

    // 응답 callback 함수 리스터 해제
    NativeUtils.unSubscribe(this.nativeCallback);
  }
}
