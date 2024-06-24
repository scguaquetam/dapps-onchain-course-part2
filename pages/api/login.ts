export default function handler(req : any, res : any) {
  if (req.method === 'GET') {
    
    res.status(200).json({ message: 'This is a GET request' });
  } else if (req.method === 'POST') {
    
    res.status(200).json({ message: 'This is a POST request' });
  }
}