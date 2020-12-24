// Append true after every script as per React Native Webview Documentation

export const logoutScript = `WebForm_DoPostBackWithOptions(new WebForm_PostBackOptions("ctl00$lnkSignout", "", true, "", "", false, true));true;`;

export const returnLoginScript = (username, password, captcha) =>
  `document.getElementById('txtUserid').value = "${username}";
document.getElementById('txtpassword').value = "${password}";
document.getElementById('txtCaptcha').value = "${captcha}";
__doPostBack('hprlnkStduent','');
true;`;

export const getUserScript = `
let user = {
	id: '',
	name: '',
	year: '',
	program: '',
	phone: '',
	email: '',
};

let data = {
	msg:'',
	error:'',
	isLoggedIn: false,
	displayName: '',
	user,
};

try{
	let errEle = document.getElementById('labelerror') || document.getElementById('lblErrorMsg');
	data.msg = errEle ? errEle.innerText : '';
	let labelName = document.getElementById('LblName');
	if(labelName){
	data.displayName = document.getElementById('LblName').innerText;
	data.isLoggedIn = true;
	}else data.isLoggedIn = false;
}catch(e){
	data.error = e;
};

try{
	data.user.id = document.getElementById('ContentPlaceHolder1_txtApplicationNumber').value;
	data.user.name = document.getElementById('ContentPlaceHolder1_txtStudentName').value;
	data.user.year = document.getElementById('ContentPlaceHolder1_txtAcademicYear').value;
	data.user.program = document.getElementById('ContentPlaceHolder1_txtProgramBranch').value;
	data.user.phone = document.getElementById('ContentPlaceHolder1_hdnCompareMobile').value;
	data.user.email = document.getElementById('ContentPlaceHolder1_hdnCompareEmail').value.toLowerCase();
}catch(_){
	data.user = user;
}

window.ReactNativeWebView.postMessage(JSON.stringify(data));
true;`;

export const getAttendanceScript = `
let attendance = {data:null};
try{
	let raw = document.getElementById('ContentPlaceHolder1_grdAttendanceDetails').innerText;
	raw = JSON.parse('[["' + raw.replaceAll('\\n', '"],["').replaceAll("\\t", '","') + '"]]');
	attendance.data = raw;
}catch(_){
	attendance.data = null;
}
window.ReactNativeWebView.postMessage(JSON.stringify({attendance}));
true;`;
