// 引用zepto
let fileInput = document.getElementById('file');
let fileList = document.getElementsByClassName('tbody')[0];
let fileItem = document.createElement('tr'),
    file, size;
fileInput.addEventListener('change', function (e) {
    console.log(this.files);
    fileItem = ``;
    for (let i = 0; i < this.files.length; i++) {
        file = this.files[i];
        size = file.size > 1024
            ? file.size / 1024  > 1024
            ? file.size / (1024 * 1024) > 1024
            ? (file.size / (1024 * 1024 * 1024)).toFixed(2) + 'GB'
            : (file.size / (1024 * 1024)).toFixed(2) + 'MB'
            : (file.size / 1024).toFixed(2) + 'KB'
            : (file.size).toFixed(2) + 'B'; 
        console.log('fileInput', this.files);
        fileItem += `
        <tr class="file-item">
        <td>${ file.name }</td>
        <td>${ size }</td>
        <td> 0 % </td>
        <td>未开始</td>
        <td>
        <button class="uplaod" data-size=${ file.size }>上传</button>
        </td>
        </tr>
        `;
        console.log('fileList', fileList);
        
    }
    fileList.innerHTML = fileItem; 
});

$(fileList).on('click', function(e) {
    let uploadBtn = $(e.target),
        $tr = uploadBtn.parents('tr'),
        index = $tr.index(),
        files = fileInput.files,
        totalSize = uploadBtn.attr('data-size'),
        eachSize = 1024,
        chunks = Math.ceil(totalSize/eachSize);
    console.log('files', files);
    console.log('value', uploadBtn.attr('value'));
    console.log('click', this);
    console.log('totalSize', totalSize);
    console.log('file', files[index]);
    let formData = new FormData($('#myForm')[0])
    formData.append('file', files[index]);
    formData.append('test', 111);
    $.ajax({
        type: 'POST',
        url: '/upload',
        data: formData,
        processData: false,
        success: function(data) {
            console.log('success', data);
        },
        error: function(err) {
            console.log('error', err);
        }
    })
})

