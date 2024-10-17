const editor = document.getElementById('editor');
const saveButton = document.getElementById('saveButton');

// 从 Worker 加载文本
async function loadText() {
    try {
        const response = await fetch('/api/load');
        if (!response.ok) {
            throw new Error('Failed to load text');
        }
        editor.value = await response.text();
    } catch (error) {
        console.error('Error loading text:', error);
    }
}

// 保存文本到 Worker
async function saveText() {
    try {
        const response = await fetch('/api/save', {
            method: 'POST',
            body: editor.value
        });
        if (!response.ok) {
            throw new Error('Failed to save text');
        }
        alert('Text saved successfully!');
    } catch (error) {
        console.error('Error saving text:', error);
        alert('Failed to save text. Please try again.');
    }
}

// 初始加载文本
loadText();

// 绑定保存按钮事件
saveButton.addEventListener('click', saveText);

// 定期检查更新（每 30 秒）
setInterval(loadText, 30000);