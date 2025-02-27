window.onload = ()=> {

    fetch('code/assets/upload.png').then(r => r.blob()).then( imageBlob => {
        const imageObjectURL = URL.createObjectURL(imageBlob);
        console.log(imageObjectURL);
        document.getElementById("img").src = imageObjectURL;
    })

    var fileArea = document.querySelector("#file-area");
    var fileInput = document.querySelector('#fileInput');
    var uploadButton = document.querySelector('#uploadButton');
    var meter = document.getElementById('rloder');
    var fileName = document.getElementById('fileName');
    meter.style.display = "none";
    fileName.innerText = "";

    fileArea.addEventListener('change', function() {
         meter.style.display = "none"
         var len = fileInput.files.length 
         fileName.innerText = (len <= 1  ? `Selected: ${fileInput.files[0]['name']}` : `Selected: ${len} files`) 
    })

    uploadButton.addEventListener('click', function() {
        var formData = new FormData();
        var files = fileInput.files;

        if (files.length != 0) {
            for (var i = 0; i < files.length; i++) {
                formData.append("f", files[i]);
            }

            var xhr = new XMLHttpRequest();
            xhr.open('POST', '/upload', true);

            xhr.upload.onprogress = function(event) {
                // Handle progress events
                meter.style.display = "block"
                var len = (event.loaded /event.total) * 90
                meter.style.width = len + "%";
                deg = (event.loaded /event.total) * 360
                document.getElementById("img").style.transform = "rotate("+deg+"deg)";
                console.log((event.loaded /event.total) * 100)
            };

            xhr.onload = function(event) {
                if(xhr.status == 200) {
                    // success Block
                    fileName.innerText = "Upload Successful!";
                    fileInput.value = '';
                } else {
                    fileName.innerText = "";
                    meter.style.display = "none"
                    alert("Failed")
                }
                console.log(xhr.status)
            };
            xhr.send(formData);
        } else {
            alert("No files")
            meter.style.display = "none";
            fileName.innerText = "";
        }
    });
}