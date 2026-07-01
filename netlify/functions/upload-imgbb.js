export async function handler(event) {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  const apiKey = process.env.IMGBB_API_KEY;
  if (!apiKey) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Missing IMGBB_API_KEY environment variable' }),
    };
  }

  let payload;
  try {
    payload = JSON.parse(event.body || '{}');
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Invalid JSON body' }),
    };
  }

  const { image, name } = payload;
  if (!image) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Missing image data' }),
    };
  }

  const base64 = typeof image === 'string' ? image.replace(/^data:image\/[a-zA-Z]+;base64,/, '') : '';
  if (!base64) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Invalid image data' }),
    };
  }

  try {
    const formData = new URLSearchParams();
    formData.append('key', apiKey);
    formData.append('image', base64);
    if (name) {
      formData.append('name', name);
    }

    const response = await fetch('https://api.imgbb.com/1/upload', {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();

    if (!data || !data.success) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: data?.error?.message || 'ImgBB upload failed' }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ url: data.data.display_url }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Upload error' }),
    };
  }
}
