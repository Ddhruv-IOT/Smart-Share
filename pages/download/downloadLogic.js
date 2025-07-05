// // Send an HTTP GET request to the back-end to get the list of files
// fetch('/files').then(response => response.json()).then(files => {
//   fetch('code/assets/dw.png').then(r => r.blob()).then( imageBlob => {
//     const imageObjectURL = URL.createObjectURL(imageBlob);
//     console.log(imageObjectURL);
    
//     let i = 0;
//     const template = document.getElementById('template');
//     const table = document.getElementById('con');
    
//     for (const filename of files) {
//       // Clone the template
//       i = i + 1;
//       const row = document.importNode(template.content, true);
//       console.log(row)
//       // Set the filename in the template
//       row.getElementById('num').innerHTML = i;
//       row.querySelector('a').innerHTML = filename;
//       row.querySelector('a').href = `/download/${filename}`;
//       row.querySelector('img').src = imageObjectURL;
//       row.getElementById('dbtn').href = `/download/${filename}`;
//       // Append the row to the table
//       table.appendChild(row);
//     }
//   }
//   );
// });

// // function parseSelection(str, max) {
// //   const out = new Set();            // Set keeps things unique
// //   for (const chunk of str.split(',')) {
// //     if (!chunk.trim()) continue;    // skip empties
// //     let [a, b] = chunk.split('-').map(s => parseInt(s.trim(), 10));

// //     // Single value like “4”
// //     if (!b) {
// //       if (a >= 1 && a <= max) out.add(a);
// //       continue;
// //     }

// //     // Range like “3‑7”
// //     if (isNaN(a) || isNaN(b)) continue;
// //     if (a > b) [a, b] = [b, a];     // support “7‑3”
// //     for (let i = a; i <= b && i <= max; i++) out.add(i);
// //   }
// //   return [...out].sort((x, y) => x - y);   // return ordered array
// // }

// document.onload = function(){
//   alert("loaded")
// }

// // document.getElementById('batchBtn').addEventListener('click', () => {
// //   alert("D")
// //   // const txt = document.getElementById('rangeInput').value;
// //   // const indexes = parseSelection(txt, files.length);
// //   // alert(indexes)

// //   // if (!indexes.length) {
// //   //   alert('Nothing to download – check your range.');
// //   //   return;
// //   // }

// //   // // Sequential downloads to avoid most browser throttles
// //   // (async () => {
// //   //   for (const idx of indexes) {
// //   //     const filename = files[idx - 1];      // our table is 1‑based
// //   //     if (!filename) continue;

// //   //     // create a temporary anchor, click, remove
// //   //     const a = document.createElement('a');
// //   //     a.href = `/download/${filename}`;
// //   //     a.download = filename;                // hint to the browser
// //   //     document.body.appendChild(a);
// //   //     a.click();
// //   //     a.remove();

// //   //     // tiny pause keeps the UX smooth & slip past aggressive blockers
// //   //     await new Promise(r => setTimeout(r, 150));
// //   //   }
// //   // })();
// // });



document.addEventListener('DOMContentLoaded', () => {
  // Fetch the file list from the server
  fetch('/files')
    .then(response => response.json())
    .then(files => {
      // Load the image blob
      fetch('code/assets/dw.png')
        .then(r => r.blob())
        .then(imageBlob => {
          const imageObjectURL = URL.createObjectURL(imageBlob);

          const template = document.getElementById('template');
          const table = document.getElementById('con');

          // Populate the table
          files.forEach((filename, index) => {
            const row = document.importNode(template.content, true);
            row.getElementById('num').innerHTML = index + 1;
            row.querySelector('a').innerHTML = filename;
            row.querySelector('a').href = `/download/${filename}`;
            row.querySelector('img').src = imageObjectURL;
            row.getElementById('dbtn').href = `/download/${filename}`;
            table.appendChild(row);
          });

          // Handle range batch download
          document.getElementById('batchBtn').addEventListener('click', () => {
            const txt = document.getElementById('rangeInput').value;
            const indexes = parseSelection(txt, files.length);

            if (!indexes.length) {
              alert('Nothing to download – check your range.');
              return;
            }

            // Sequential download
            (async () => {
              for (const idx of indexes) {
                const filename = files[idx - 1];
                if (!filename) continue;

                const a = document.createElement('a');
                a.href = `/download/${filename}`;
                a.download = filename;
                document.body.appendChild(a);
                a.click();
                a.remove();

                await new Promise(r => setTimeout(r, 150));
              }
            })();
          });

          // Range parser
          function parseSelection(str, max) {
            const out = new Set();
            for (const chunk of str.split(',')) {
              if (!chunk.trim()) continue;
              let [a, b] = chunk.split('-').map(s => parseInt(s.trim(), 10));
              if (!b) {
                if (a >= 1 && a <= max) out.add(a);
                continue;
              }
              if (isNaN(a) || isNaN(b)) continue;
              if (a > b) [a, b] = [b, a];
              for (let i = a; i <= b && i <= max; i++) out.add(i);
            }
            return [...out].sort((x, y) => x - y);
          }
        });
    });
});

