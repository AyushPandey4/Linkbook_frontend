// src/utils/formatUrl.js
export const formatUrl = (input) => {
    let url = input.trim();
    
    // Add http:// if missing
    if (!/^(?:f|ht)tps?:\/\//.test(url)) {
      url = `http://${url}`;
    }
    
    // Add .com if no domain extension exists
    const domain = url.split('/')[2];
    if (domain && !domain.includes('.') && !domain.includes('localhost')) {
      url = url.replace(domain, `${domain}.com`);
    }
    
    return url;
  };