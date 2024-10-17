const editor = document.getElementById('editor');
const saveButton = document.getElementById('saveButton');

// 从 Gist 加载文本
async function loadText() {
    try {
        const response = await fetch(`https://api.github.com/gists/${window.ENV.GIST_ID}`, {
            headers: {
                'Authorization': `token ${window.ENV.GITHUB_TOKEN}`,
                'Accept': 'application/vnd.github.v3+json'
            }
        });
        if (!response.ok) {
            throw new Error('Failed to load text');
        }
        const data = await response.json();
        editor.value = data.files['shared-text.txt'].content;
    } catch (error) {
        console.error('Error loading text:', error);
    }
}

// 保存文本到 Gist
async function saveText() {
    try {
        const response = await fetch(`https://api.github.com/gists/${window.ENV.GIST_ID}`, {
            method: 'PATCH',
            headers: {
                'Authorization': `token ${window.ENV.GITHUB_TOKEN}`,
                'Content-Type': 'application/json',
                'Accept': 'application/vnd.github.v3+json'
            },
            body: JSON.stringify({
                files: {
                    'shared-text.txt': {
                        content: editor.value
                    }
                }
            })
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
