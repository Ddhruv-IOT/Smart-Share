// <!-- <!DOCTYPE html>
// <html lang="en">
//   <head>
//     <meta charset="UTF-8">
//     <meta http-equiv="X-UA-Compatible" content="IE=edge">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     <title> Pool Page </title>

//     <style>
//       table {
//         font-family: arial, sans-serif;
//         border-collapse: collapse;
//         width: 100%;
//         border: 2px solid black;
     
//       }
      
//       td, th {
//         border: 1px solid #dddddd;
//         text-align: left;
//         padding: 8px;
//       }
      
//       tr:nth-child(even) {
//         background-color: #dddddd;
//       }
//       </style>
//   </head>

//   <body>
//     <table id="files">
//       <tr>
//         <th> S. No </th>
//         <th> File Name </th>
//         <th> Ext. </th>
//       </tr>
//       <template id="download-link-template">
//         <tr>
//           <td id="num"> </td>
//           <td>
//             <a href="/download/{{filename}}" download>{{filename}}</a>
//           </td>
//           <td> txt </td>
//         </tr>
//       </template>
//     </table>

//     <script>
//       // Send an HTTP GET request to the back-end to get the list of files
//       fetch('/files')
//         .then(response => response.json())
//         .then(files => {
//           const template = document.getElementById('download-link-template');
//           const table = document.getElementById('files');
//           let i = 0;
//           for (const filename of files) {
//             // Clone the template
//             i = i + 1;

//             const row = document.importNode(template.content, true);
//             // Set the filename in the template
//             row.getElementById('num').innerHTML = i;
//             row.querySelector('a').innerHTML = filename;
//             row.querySelector('a').href = `/download/${filename}`;
            
//             // Append the row to the table
//             table.appendChild(row);
//           }
//         });
//     </script>
//   </body>
// </html> -->