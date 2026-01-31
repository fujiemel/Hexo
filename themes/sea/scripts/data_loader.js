const fs = require('fs');
const path = require('path');

/**
 * 通用数据加载器，从 config/ 目录下的指定文件夹加载 YAML 数据
 * @param {string} folder 文件夹名称 (如 'bangumi', 'footprints')
 * @param {string} filename 文件名 (默认为 文件夹名.yml)
 */
hexo.extend.helper.register('load_config_data', function(folder, filename) {
  const targetFile = filename || `${folder}.yml`;
  const dataPath = path.join(hexo.base_dir, 'config', folder, targetFile);
  
  if (fs.existsSync(dataPath)) {
    try {
      const content = fs.readFileSync(dataPath, 'utf8');
      // 使用 Hexo 内置的渲染器
      return hexo.render.renderSync({ text: content, engine: 'yaml' });
    } catch (e) {
      hexo.log.error(`[Hexo-Theme-Sea] Error loading data from ${dataPath}:`, e);
      return [];
    }
  }
  return [];
});
