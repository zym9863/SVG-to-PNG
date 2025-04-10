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
    if (svgCode) {
      // 清空预览区域
      preview.innerHTML = '';
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
        preview.textContent = '预览失败：' + error.message;
      }
    } else {
      preview.textContent = '请输入SVG代码';
    }
  }

  function downloadPNG() {
    const svgElement = preview.querySelector('svg');
    if (!svgElement) {
      alert('请先输入有效的SVG代码');
      return;
    }

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
      }, 'image/png');
    };
    img.src = url;
  }
});