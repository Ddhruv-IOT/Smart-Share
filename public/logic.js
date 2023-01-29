// Send an HTTP GET request to the back-end to get the list of files
fetch('/files').then(response => response.json()).then(files => {
    fetch('/dw.png').then(r => r.blob()).then( imageBlob => {
        const imageObjectURL = URL.createObjectURL(imageBlob);
        console.log(imageObjectURL);

        let i = 0;
        const template = document.getElementById('template');
        const table = document.getElementById('con');
        for (const filename of files) {
          // Clone the template
          i = i + 1;
          const row = document.importNode(template.content, true);
          console.log(row)
          // Set the filename in the template
          row.getElementById('num').innerHTML = i;
          row.querySelector('a').innerHTML = filename;
          row.querySelector('a').href = `/download/${filename}`;
          row.querySelector('img').src = imageObjectURL;
          // Append the row to the table
          table.appendChild(row);
        }
      }
      );
    });