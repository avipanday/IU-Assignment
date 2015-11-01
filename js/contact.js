$(document).ready(function() {
	toggleMethods();

	$("#bestWay").change(function () {
		toggleMethods();
	});

})

function toggleMethods() {
	if ($("#bestWay").val() == "wp") {
		$("#userNumberDiv").show();
		$("#cellNumberDiv").hide();
		$("#userEmailDiv").hide();
		$("#iMessengerDiv").hide();
	} else if ($("#bestWay").val() == "cp") {
		$("#cellNumberDiv").show();
		$("#userNumberDiv").hide();
		$("#userEmailDiv").hide();
		$("#iMessengerDiv").hide();
	} else if ($("#bestWay").val() == "em") {
		$("#userEmailDiv").show();
		$("#userNumberDiv").hide();
		$("#cellNumberDiv").hide();
		$("#iMessengerDiv").hide();
	} else if ($("#bestWay").val() == "im") {
		$("#iMessengerDiv").show();
		$("#userNumberDiv").hide();
		$("#cellNumberDiv").hide();
		$("#userEmailDiv").hide();
	} else {
		$("#userNumberDiv").hide();
		$("#cellNumberDiv").hide();
		$("#userEmailDiv").hide();
		$("#iMessengerDiv").hide();
	}
}

function validatePhone(typeNum) {
	var phoneNum = document.forms["usrform"][typeNum].value;
	var justNums = phoneNum.replace("-", "");
	var firstDash = phoneNum.indexOf("-");
	var secondDash = phoneNum.lastIndexOf("-");

	if (phoneNum.length === 12) {
		if (!isNaN(parseInt(justNums))) {
			if (firstDash == 3 && secondDash == 7) {
				return true;
			} else {
				alert("Your phone number " + phoneNum + " does not match the format XXX-XXX-XXXX! Your dashes are not in the correct positions. Please try again!");
			}
		} else {
			alert("Your phone number " + phoneNum + " does not match the format XXX-XXX-XXXX! It has invalid characters. Please try again!");
		}
	} else {
		alert("Your phone number " + phoneNum + " does not match the format XXX-XXX-XXXX! It does not have the correct length. Please try again!");
	}
}

function validateEmail() {
	var emailAdd = document.forms["usrform"]["userEmail"].value;
	var atIndex = emailAdd.indexOf("@");
	var dotIndex = emailAdd.lastIndexOf(".");	

	if (atIndex < 1 || dotIndex < atIndex+2 || dotIndex + 2 >= emailAdd.length) {
		alert("Your email address " + emailAdd + " does not match the format XXX@XXX.XXX! Please correct and try again!");
	}
}

function validateForm() {

	if ($("#bestWay").val() == "wp") {
		validatePhone("userNumber");
	} else if ($("#bestWay").val() == "cp") {
		validatePhone("cellNumber");
	} else if ($("#bestWay").val() == "em") {
		validateEmail();
	} else {
		alert("Please select the best way to reach you!");
	}
}

//Note: parts of this code were modified from the examples given at https://blog.udemy.com/javascript-validation-2/

