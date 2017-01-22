$(document).ready(function() {
	console.log("init-js");
	var required_pts = 10;
	var num_pts = 0;
	var num_test = 15;
	var test_num = 1;

	var $img_canvas = $("#img_canvas");
	var canvas = document.getElementById('img_canvas');
	var context = canvas.getContext('2d');

	var max_width = 560;
	var max_height = 400;

	var points = new Array();
	
	var cur_target_url = "resource/XPRO_001.png";

	loadImage(cur_target_url);
	updateProgressbar();


	$img_canvas.click(addPoints);
	$("#reset_btn").on('click', reset);
	$("#submit_btn").on('click', submit);

	function loadTaskFile(task_id) {
		file_url = "resource/task" + task_id + ".txt";
		console.log(file_url);


	}

	function loadImage(url) {
		max_width = $img_canvas.parent().width();
		var target_img = new Image();
		target_img.onload = function() {

			var ratio = 0;
	        var img_width = this.width;
			var img_height = this.height;

	        if(img_width > max_width){
	            ratio = max_width / img_width;
	            context.canvas.width = max_width;
	            context.canvas.height = img_height * ratio;

	            img_width = img_width * ratio;
	            img_height = img_height * ratio;
	        }

	        if(img_height > max_height){
	            ratio = max_height / img_height;
	            context.canvas.height = max_height;
	            context.canvas.width = img_width * ratio;

	         	img_width = img_width * ratio;
	            img_height = img_height * ratio;   
	        }

			context.drawImage(target_img, 0, 0, img_width, img_height);
		}
		target_img.src = url
	}

	function addPoints() {
		if(num_pts < required_pts) {
			num_pts = num_pts + 1
			var offset = $(this).offset();
			var posX = event.pageX - offset.left;
			var posY = event.pageY - offset.top;

			$img_canvas.drawArc({
			  fillStyle: 'red',
			  strokeStyle: '#ffffff',
			  strokeWidth: 1,
			  x: posX, y: posY,
			  radius: 5
			});
			$("#pts_count").html(required_pts - num_pts);
			if(num_pts == required_pts) {
				$("#submit_btn").prop('disabled', false);	
			}
		}
	}

	function reset() {
		console.log("reset");
		$img_canvas.clearCanvas();
		loadImage(cur_target_url);
		num_pts = 0;
		$("#pts_count").html(10);
	}

	function submit() {
		console.log("submit");




		reset();
		$("#submit_btn").prop('disabled', true);	
		getNextData();
	}

	function getNextData() {
		test_num = test_num + 1;
		updateProgressbar();

		$("video:nth-child(1)").attr("src", "resource/XPRO-0_39_14-0_41_50.mp4")
		cur_target_url = "resource/XPRO_002.png"
		loadImage(cur_target_url);
		
		console.log("next data");
	}

	function updateProgressbar() {
		percent = Math.ceil(test_num / num_test * 100);
		percent_str = percent + "%";

		$(".progress-bar").attr("aria-valuenow", percent);
		$(".progress-bar").css("width", percent_str);
		$(".progress-bar span").text(percent_str);
	}

});
