import { verifyMessage } from 'ethers';

export default function handler(req : any, res : any) {
  if (req.method === 'GET') {
    //read query params, if has /nonce then return nonce
    const { request } = req.query;
    if(request === 'nonce'){
      res.status(200).json({ message: 'Get unique nonce for signature', nonce: 'Sign this nonce 123456' });
    }
    else {
      res.status(200).json({ message: 'This is a GET request' });
    }
  } else if (req.method === 'POST') {
    //read body, if has signature then return success
    console.log('requesting post method');
    
    const { signature, nonce, method, address } = req.body;
    if(method === 'signature'){
      console.log('signature', signature);
      
      const addressLower = address.toLowerCase();
      const verifyAddress = verifyMessage(nonce, signature);
      if(addressLower !== verifyAddress.toLowerCase()){
        res.status(400).json({ message: 'Signature failed, unauthorized signature', signature, nonce });
      }
      res.status(200).json({ 
        message: 'Signature success', 
        token: 'this is a JWT',
        signature, 
        nonce 
      });
    }
    res.status(200).json({ message: 'This is a POST request' });
  }
}