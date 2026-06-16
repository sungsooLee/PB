/*************************************************************************
 * @ 서비스경로 : NMCRMNG30M
 * @ 파일명      : NMCRMNG30M.js 고객명함 관리 - 지점 명함첩 - 등록
 * @ 화면ID 	 : PBWBU079900
 * @ 작성자      : 90194835
 * @ 작성일      : 2024-12-06
 ************************** 수정이력 ****************************************
 * 날짜                    작업자                 변경내용
 *_________________________________________________________________________
 * 2024-12-06            윤은정                 최초작성
 *************************************************************************/
import { BaseModule } from "../cmm/BaseModule.js";
import GlobalApp from "/components/cmm/GlobalApp.js";

const globalApp = GlobalApp;

//router 초기화
const router = globalApp.router;

let photo_file = "";

export default class NMCRMNG30M extends BaseModule {
  constructor(elem) {
    super(elem);
    this.rootElem = elem;

    [this.nmcrNm, this.setNmcrNm] = this.useState("nmcrNm", ""); // 이름
    [this.nmcrComNm, this.setNmcrComNm] = this.useState("nmcrComNm", ""); // 회사
    [this.nmcrHpNo, this.setNmcrHpNo] = this.useState("nmcrHpNo", ""); // 휴대폰번호
    [this.nmcrDepNm, this.setNmcrDepNm] = this.useState("nmcrDepNm", ""); // 부서
    [this.nmcrDtsNm, this.setNmcrDtsNm] = this.useState("nmcrDtsNm", ""); // 직책
    [this.nmcrEmail, this.setNmcrEmail] = this.useState("nmcrEmail", ""); // 이메일
    [this.nmcrInlxNo, this.setNmcrInlxNo] = this.useState("nmcrInlxNo", ""); // 전화번호
    [this.nmcrFaxNo, this.setNmcrFaxNo] = this.useState("nmcrFaxNo", ""); // 팩스번호
    [this.adr, this.setAdr] = this.useState("adr", ""); // 주소
    [this.nmcrMemoTxt, this.setNmcrMemoTxt] = this.useState("nmcrMemoTxt", ""); // 메모

    [this.fileNm, this.setFileNm] = this.useState("fileNm", ""); // 파일명
    [this.fileSize, this.setFileSize] = this.useState("fileSize", "0"); // 파일사이즈
    [this.fileYn, this.setFileYn] = this.useState("fileYn", "N"); // 파일여부확인
    [this.imgType, this.setImgType] = this.useState("imgType", ""); // 파일확장자
    [this.filePath, this.setFilePath] = this.useState("filePath", "NMCR"); // 경로
    [this.atflNm, this.setAtflNm] = this.useState("atflNm", ""); // 파일ID

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

  init() {
    super.init(this);

    this.bind("nmcrNm", $$("#nmcrNm"), "input");
    this.bind("nmcrComNm", $$("#nmcrComNm"), "input");
    this.bind("nmcrHpNo", $$("#nmcrHpNo"), "input");
    this.bind("nmcrDepNm", $$("#nmcrDepNm"), "input");
    this.bind("nmcrDtsNm", $$("#nmcrDtsNm"), "input");
    this.bind("nmcrEmail", $$("#nmcrEmail"), "input");
    this.bind("nmcrInlxNo", $$("#nmcrInlxNo"), "input");
    this.bind("nmcrFaxNo", $$("#nmcrFaxNo"), "input");
    this.bind("adr", $$("#adr"), "input");
    this.bind("nmcrMemoTxt", $$("#nmcrMemoTxt"), "input");

    this.initRegist();
  }

  initRegist() {
    $("input").on("keyup", async (e) => await this.handleInputClick(e)); // 필수 값 체크 후 등록버튼 활성화 처리
    $(".input-remove").on(
      "click",
      async (e) => await this.handleInputDelClick(e),
    ); // X버튼 클릭시, 데이터 지움.
    $$("#nmcrMemoTxt").on("keyup", async () => await this.handleMemoClick()); // 메모 글자수 확인
    $$("#btnDelImg").on("click", async () => await this.handleImgDelClick()); // 이미지 삭제
    $$("#nmcrEmail").on("focusout", async (e) => await this.validateEmail(e)); // 메일형식 체크
    $$("#nmcrHpNo").on("focusout", async (e) => await this.validateHpNum(e));

    $$("#fileUploadId").on(
      "change",
      async () => await this.handleGalleryClick(),
    ); // 갤러리 업로드
    $$("#btnGallery").on(
      "click",
      async () => await this.handleGalleryInfoClick(),
    ); // 명함 촬영   >> 갤러리 btnGallery
    $$("#btnCamera").on(
      "click",
      async () => await this.handleCameraInfoClick(),
    ); // 명함 촬영   >> 카메라 btnCamera

    $("input[name=radio_only_me_view_yn]").on(
      "click",
      async () => await this.handleOnlyMeViewRadioClick(),
    );
    $('input[name="hdnYn"]').on(
      "click",
      async () => await this.handleOnlyMeMemoCheckClick(),
    );

    $$("#layoutBtn2").addAttr("aria-disabled", true); // 등록 버튼 비활성화
    this.registerCallback("click", $$("#layoutBtn2"), this.handleBtnClick); // 고객 명합 등록
  }

  /**
   *  필수 값 확인
   * @param
   */
  async handleInputClick(e) {
    const inputTxt1 = this.nmcrNm.value;
    const inputTxt2 = this.nmcrComNm.value;
    let inputTxt3 = this.nmcrHpNo.value;
    let inputVal;

    console.log("필수 값 확인");
    console.log("e?.target", e?.target);
    console.log(`$('#card_img").attr('src')`, $("#card_img").attr("src"));

    // 2025-05-26 : 갤러리 사용시 이미지의 빈 값 체크를 위한 로직
    if (e?.target !== undefined && $("#card_img").attr("src") !== "") {
      inputVal = e.target;

      if (inputVal.id === "nmcrHpNo") {
        $$("#hpForm").removeClass("form-invalid");
        inputVal.value = inputVal.value.replace(/[^0-9]/g, "");
        inputTxt3 = inputVal.value;
      }

      if (inputVal.id === "nmcrFaxNo") {
        inputVal.value = inputVal.value.replace(/[^0-9]/g, "");
      }

      const inputMaxLen = $(e.target).attr("maxlength");
      const inputLen = e.target.value.length;

      if (inputLen > inputMaxLen) {
        return false;
      }

      if (e.target.id === "nmcrEmail") {
        $$("#mailFrm").removeClass("form-invalid");
      }
    }

    if (
      inputTxt1 &&
      inputTxt2 &&
      inputTxt3.length === 11 &&
      this.fileYn.value === "Y"
    ) {
      $$("#layoutBtn2").addAttr("aria-disabled", false); // 등록 버튼 활성화
    } else {
      $$("#layoutBtn2").addAttr("aria-disabled", true); // 등록 버튼 비활성화
    }
  }

  /**
   *  핸드폰번호 확인
   * @param
   */
  async validateHpNum(e) {
    const inputVal = e.target;
    const inputLen = inputVal.value.length;
    $$("#hpForm").removeClass("form-invalid");

    if (inputVal.value.slice(0, 2) !== "01") {
      $$("#hpForm").addClass("form-invalid");
      $("#hpForm .validate-text").text("잘못된 휴대폰 번호 형식입니다.");
    } else if (inputLen < 11) {
      $$("#hpForm").addClass("form-invalid");
      $("#hpForm .validate-text").text("11자리를 입력해주세요.");
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
    $$("#hpForm").removeClass("form-invalid");
    this.handleInputClick();
  }

  /**
   *  메모 내용 글자수확인 및 제한
   * @param
   */
  async handleMemoClick() {
    let memoTxt = this.nmcrMemoTxt.value;

    if (memoTxt === null || memoTxt.length <= 0) {
      $("#memoTxtLen").html("0 / 300자");
    } else if (memoTxt.length > 300) {
      const result = CmmUtils.alert(
        "",
        "메모는 300자 넘게 입력하실 수 없습니다.",
        {
          btnLabel: "확인",
          icon: "caution",
        },
      );
      this.setNmcrMemoTxt(memoTxt.substring(0, 300));
      return false;
    } else {
      $("#memoTxtLen").html(memoTxt.length + " / 300자");
    }
  }

  /**
   *  이메일형식확인
   * @param
   */
  async validateEmail(e) {
    const mailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const mail = e.target.value;

    if (!mailPattern.test(mail)) {
      $$("#mailFrm").addClass("form-invalid");
    }
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
    /*
		const result = await Swal.fire({
			showCloseButton: true,
			reverseButtons: true,
			confirmButtonText: `<i class='ico-check'></i>확인`,
			customClass: {
				htmlContainer: 'mt40',
				actions: 'btn-wrap pt40',
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
		if(result.isConfirmed) {
			console.log('카메라 선택 안내 콜백 영역');

		}
		*/
    const res = await NativeUtils.callCropImageScan();
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
      this.setImgType($.trim(type));
      res = imgStr;
    } else {
      $("#card_img").attr("src", res);
      const regex = /^data:image\/(png|jpeg|jpg);base64,/;
      const match = res.match(regex);
      type = match[1];
      this.setImgType(type);
    }

    if ($.inArray(this.imgType.value, ["jpg", "jpeg", "png"]) === -1) {
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
    this.setFileSize(fileSize);

    if (!this.fileNm.value) {
      this.setFileNm("cptured_image." + this.imgType.value);
    }
    this.extImageYn("Y");
    this.setFileYn("Y");

    photo_file = await this.base64ToFile(
      res,
      this.fileNm.value,
      this.imgType.value,
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

      $("#card_img").attr("src", "");
      $("#fileUploadId").val("");
      $("#cameraUploadId").val("");
      $("#no_img").show();
      $("#yes_img").hide();
      //			this.setPhotoFile('');
      this.setFileYn("N");
      this.handleInputClick();
    } else {
      return false;
    }
  }

  /**
   *  명함이미지 등록 처리
   * @param
   */
  extImageYn(imageYnVal) {
    if (imageYnVal === "Y") {
      $("#no_img").hide();
      $("#yes_img").show();
    } else {
      $("#card_img").attr("src", ""); //이미지
      //			$("#card_detail_img").attr("src","");	//상세 이미지
      $("#no_img").show(); //이미지
      $("#yes_img").hide();
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
      this.setFileNm(file.name);

      const type = file.type;
      this.setImgType(type.substr(type.indexOf("/") + 1));

      if ($.inArray(this.imgType.value, ["jpg", "jpeg", "png"]) === -1) {
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
      this.setFileSize(file.size);

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
    this.setFileYn("Y");
    this.handleInputClick(); // 필수값체크
  }

  /**
   *  고객명함등록 - 파일 업로드
   * @param
   */
  async handleBtnClick() {
    const hasCls = $("#layoutBtn2").attr("aria-disabled");
    if (hasCls === "true") {
      // 저장 가능 상태 확인
      return false;
    }

    const fileInput = document.getElementById("fileUploadId");
    const files = fileInput.files;

    const params = {
      fileNm: this.fileNm.value,
      filePath: this.filePath.value,
      fileType: this.imgType.value,
    };

    console.log("파일업로드 " + JSON.stringify(params));

    const res = await ApiUtils.uploadFile(files, params);
    console.log("파일업로드 res " + JSON.stringify(res));

    if (res.resultCode === "000000") {
      this.setAtflNm(res.data[0]);
      this.nameCardRegist();
    } else {
      toastr.error(``, res.resultMessage);
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
   *  고객명함등록 - 파일 업로드 후, 고객정보 및 파일정보 등록
   * @param
   */
  async nameCardRegist() {
    //		const fileObj = $("#fileUploadId");
    const isOnlyMeView = $("input[name=radio_only_me_view_yn]:checked").val();
    const usgYn = $("#favtUsgYn").is(":checked") === true ? "Y" : "N";
    const hdnYn = $("#hdnYn").is(":checked") === true ? "Y" : "N";

    const url = "/pb/api/nmcr/cus/saveNmcrCus.json";
    const params = {};
    params.favtUsgYn = usgYn;
    params.nmcrNm = this.nmcrNm.value;
    params.nmcrComNm = this.nmcrComNm.value;
    params.nmcrHpNo = this.nmcrHpNo.value;
    params.nmcrDepNm = this.nmcrDepNm.value;
    params.nmcrDtsNm = this.nmcrDtsNm.value;
    params.nmcrEmail = this.nmcrEmail.value;
    params.nmcrInlxNo = this.nmcrInlxNo.value;
    params.nmcrFaxNo = this.nmcrFaxNo.value;
    params.adr = this.adr.value;
    params.hdnYn = hdnYn;
    params.nmcrMemoTxt = this.nmcrMemoTxt.value;
    params.fileNm = this.fileNm.value;
    params.fileSize = this.fileSize.value;
    params.imgType = this.imgType.value;
    params.atflNm = this.atflNm.value;
    params.onlyMeView = isOnlyMeView;

    const res = await ApiUtils.sendPost(url, params);
    if (res.resultCode === "000000") {
      toastr.success(``, "저장 되었습니다.");
      // 목록화면으로 이동
      let route = "nmcrmng20m";
      setTimeout(() => {
        router.navigate(route);
      }, 2000);
    }
  }

  destroy() {
    super.destroy(this);

    // 응답 callback 함수 리스터 해제
    NativeUtils.unSubscribe(this.nativeCallback);
  }
}
