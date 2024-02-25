# Smart Share - D Star Server

!''[Smart Share](<Insert your project's logo or screenshot URL here>)

## About Project

**Smart Share - D Star Server** is a local file and text sharing solution that allows users to share files and text-based information between their devices without the need for an internet connection. It serves as a convenient and secure means of transferring data within a local network, making it an ideal choice for scenarios where internet access is limited or when you need to share sensitive data within your home or organization.

### Key Features:

- **Local Sharing:** Smart Share creates a local server on a fixed IP and port, allowing users to establish a connection within their local network. No internet connection is required, making it a versatile solution for various environments.

- **File Sharing:** Share files effortlessly between devices. Users can upload files to the server, and others can download them from the central server or local storage. This simplifies sharing documents, media, and more without relying on external cloud services.

- **Clipboard Operations:** Smart Share extends beyond file sharing. Users can copy or paste text-based information to and from the server's clipboard. This feature is particularly useful for sharing text snippets, URLs, or any other textual data between connected devices.

- **Cross-Platform:** Smart Share supports a wide range of devices and operating systems. Whether you're using Android, Windows, or other platforms, you can access the server and enjoy seamless data sharing.

- **User-Friendly:** The intuitive user interface makes it easy to navigate and perform operations. Users can select files for upload, download, view available files, and manage clipboard data with ease.

### Use Cases:

- **Home Sharing:** Use Smart Share to share family photos, documents, or videos between devices in your home network without relying on the internet.

- **Office Collaboration:** Facilitate file and text-based collaboration within your organization, even in situations where internet access is restricted or unreliable.

- **Local Events:** For events, workshops, or gatherings with limited or no internet access, use Smart Share to share presentations, documents, or other materials with attendees.

- **Secure Data Transfer:** Smart Share provides a secure way to transfer sensitive information within your organization, ensuring that data remains within your local network.

- **Education:** Teachers and students can use Smart Share to exchange educational materials, assignments, and resources within a school or university environment.

Smart Share - D Star Server offers an efficient and reliable way to transfer data within your local network, enhancing collaboration and communication in various scenarios.

## Working
The core functionalities of Smart Share - D Star Server include:

- **Central Server:** The central server serves as the source for sharing and exchanging files and text.

- **Local URL Access:** Users can access the server through an IP address or a configured URL (e.g., http://nodeserver/) on their local network.

- **File Upload and Download:** Users can upload files to the server and download files available on the server or local storage.

- **Clipboard Operations:** The server provides options to copy or paste data from/to the server's clipboard or any other connected device.

**Technologies Used:**

- Node.js v16
- HTML5
- CSS3
- Python 3.8
- C++

**Key Components:**

- Node.js Server: Creates and manages the central server.
- Multer: Allows for file read and write operations.
- Express: Used for efficient development.
- fs and path: Handles file and storage operations.
- Python: Manages clipboard-based operations on the server using spawn processes.

**File Sharing:**

The project takes files from the downloads folder and hosts them, making them accessible for download from other devices. The upload page allows users to transfer files from other devices and store them in the server's downloads folder for sharing.

**Pages:**

1. **Upload:** Users can select files or drag and drop them for upload.
2. **Download:** Displays all available files for download.
3. **Get Clipboard:** Fetches the last information on the server's clipboard.
4. **Paste Clipboard:** Allows users to add data to the server's clipboard.

## Future Works

In the future, the project aims to enhance its capabilities by:

- Adding security and authentication features.
- Implementing file splitting and uploading to handle larger files without overloading the server.
- Incorporating live video and audio streaming support.
- Expanding integrations with mobile phones and other devices.

## How to Use

Provide instructions on how to set up and use the Smart Share - D Star Server on your local network.

## Acknowledgments

Acknowledge any contributors or libraries used in your project.

## License

This project is licensed under the XYZ License - see the [LICENSE](LICENSE) file for details.
