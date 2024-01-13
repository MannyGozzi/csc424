
## SSL Certificates
### Create Certificate Authority (CA)
```bash
openssl genrsa -out CA.key -des3 2048
```
```bash
openssl req -x509 -sha256 -new -nodes -days 3650 -key CA.key -out CA.pem
```

### Create Private Keys
```bash
openssl genrsa -out localhost.key -des3 2048
```
```bash
openssl req -new -key localhost.key -out localhost.csr
```

### Sign the Keys
Make sure that your Certificate Authority (CA) paths match. Also run this comand in the cert directory.
```bash
openssl x509 -req -in localhost.csr \
-CA ~/CA/CA.pem -CAkey ~/CA/CA.key \  
-CAcreateserial -days 3650 -sha256 \
-extfile localhost.ext -out localhost.crt
```

### Decrypt the Localhost CRT Key
```bash
openssl rsa -in localhost.key \
-out localhost.decrypted.key
```

## Notes
Note that the vite mkcert plugin is used in order to manage
the certificates for the frontend.