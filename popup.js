document.addEventListener('DOMContentLoaded', () => {
  const svgInput = document.getElementById('svgInput');
  const preview = document.getElementById('preview');
  const fileName = document.getElementById('fileName');
  const downloadBtn = document.getElementById('downloadBtn');

  // 监听SVG代码输入，实时更新预览
  svgInput.addEventListener('input', updatePreview);

  // 监听下载按钮点击
  downloadBtn.addEventListener('click', downloadPNG);

  function updatePreview() {
    const svgCode = svgInput.value.trim();
    
    // 移除预览标签
    const existingLabel = preview.querySelector('.preview-label');
    if (existingLabel) {
      existingLabel.remove();
    }
    
    if (svgCode) {
      // 清空预览区域
      preview.innerHTML = '';
      
      // 重新添加预览标签
      const label = document.createElement('span');
      label.className = 'preview-label';
      label.textContent = '预览';
      preview.appendChild(label);
      
      try {
        // 将SVG代码转换为DOM元素
        const parser = new DOMParser();
        const svgDoc = parser.parseFromString(svgCode, 'image/svg+xml');
        const svgElement = svgDoc.documentElement;

        // 检查是否为有效的SVG
        if (svgElement.tagName === 'svg') {
          preview.appendChild(svgElement);
        } else {
          throw new Error('无效的SVG代码');
        }
      } catch (error) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-state';
        errorDiv.textContent = '预览失败：' + error.message;
        preview.appendChild(errorDiv);
      }
    } else {
      preview.innerHTML = '';
      const label = document.createElement('span');
      label.className = 'preview-label';
      label.textContent = '预览';
      preview.appendChild(label);
      
      const emptyState = document.createElement('span');
      emptyState.className = 'empty-state';
      emptyState.textContent = '等待 SVG 代码输入';
      preview.appendChild(emptyState);
    }
  }

  function downloadPNG() {
    const svgElement = preview.querySelector('svg');
    if (!svgElement) {
      // 显示错误动画
      const errorDiv = document.createElement('div');
      errorDiv.className = 'error-state';
      errorDiv.textContent = '请先输入有效的 SVG 代码';
      preview.innerHTML = '';
      const label = document.createElement('span');
      label.className = 'preview-label';
      label.textContent = '预览';
      preview.appendChild(label);
      preview.appendChild(errorDiv);
      return;
    }

    // 添加下载中状态
    downloadBtn.classList.add('downloading');
    const originalText = downloadBtn.lastChild.textContent;
    downloadBtn.lastChild.textContent = '下载中...';

    // 获取SVG的尺寸
    const svgWidth = svgElement.getAttribute('width') || svgElement.clientWidth;
    const svgHeight = svgElement.getAttribute('height') || svgElement.clientHeight;

    // 创建Canvas
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = svgWidth;
    canvas.height = svgHeight;

    // 将SVG转换为图片数据
    const svgData = new XMLSerializer().serializeToString(svgElement);
    const svgBlob = new Blob([svgData], {type: 'image/svg+xml;charset=utf-8'});
    const url = URL.createObjectURL(svgBlob);

    // 创建图片对象
    const img = new Image();
    img.onload = () => {
      // 在Canvas上绘制图片
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);

      // 转换为PNG并下载
      canvas.toBlob((blob) => {
        const downloadUrl = URL.createObjectURL(blob);
        const name = fileName.value.trim() || 'image';
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = `${name}.png`;
        link.click();

        // 清理URL对象
        URL.revokeObjectURL(downloadUrl);
        URL.revokeObjectURL(url);

        // 显示成功状态
        downloadBtn.classList.remove('downloading');
        downloadBtn.classList.add('success');
        downloadBtn.lastChild.textContent = '下载成功！';
        
        // 显示成功消息
        showSuccessMessage('PNG 文件已成功下载！');

        // 恢复按钮状态
        setTimeout(() => {
          downloadBtn.classList.remove('success');
          downloadBtn.lastChild.textContent = originalText;
        }, 2000);
      }, 'image/png');
    };
    
    img.onerror = () => {
      downloadBtn.classList.remove('downloading');
      downloadBtn.lastChild.textContent = originalText;
      
      const errorDiv = document.createElement('div');
      errorDiv.className = 'error-state';
      errorDiv.textContent = '转换失败，请检查 SVG 代码';
      preview.innerHTML = '';
      const label = document.createElement('span');
      label.className = 'preview-label';
      label.textContent = '预览';
      preview.appendChild(label);
      preview.appendChild(errorDiv);
    };
    
    img.src = url;
  }

  function showSuccessMessage(message) {
    const successMsg = document.createElement('div');
    successMsg.className = 'success-message';
    successMsg.textContent = message;
    document.body.appendChild(successMsg);

    setTimeout(() => {
      successMsg.remove();
    }, 3000);
  }
});