// Function to handle file upload
async function handleFileUpload(event) {
  event.preventDefault();
  
  const fileInput = document.getElementById('fileInput');
  const file = fileInput.files[0];

  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Function to handle file search and download
async function handleFileSearch(event) {
  event.preventDefault();

  const searchInput = document.getElementById('searchInput');
  const fileName = searchInput.value;

  try {
    const response = await fetch(`/api/download?filename=${fileName}`);
    if (response.ok) {
      const downloadLink = document.getElementById('downloadLink');
      const fileURL = await response.text();
      const link = document.createElement('a');
      link.href = fileURL;
      link.textContent = fileName;
      link.download = fileName;
      downloadLink.innerHTML = '';
      downloadLink.appendChild(link);
    } else {
      console.log('File not found');
    }
  } catch (error) {
    console.error(error);
  }
}

// Attach event listeners to the form and search button
document.getElementById('uploadForm').addEventListener('submit', handleFileUpload);
document.getElementById('searchButton').addEventListener('click', handleFileSearch);
