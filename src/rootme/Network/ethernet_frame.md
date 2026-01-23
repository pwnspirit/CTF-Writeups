# ETHERNET - frame

We got somple hex file in a txt file. To solve the chall, we need to convert it back to ascii.
`xxd -r -p ch12.txt `

This gave me: 

```bash
󰣇 root-me/network/ethernet-frame ❯ xxd -r -p ch12.txt                                                                                                                         13:10 
s��i��Z��`�@&S`*����� A�B3�tP��}�����Ϡ
	>i��~�GET / HTTP/1.1
Authorization: Basic Y29uZmk6ZGVudGlhbA==
User-Agent: InsaneBrowser
Host: www.myipv6.org
Accept: */*
```

Decoded the string: 

```bash
echo "Y29uZmk6ZGVudGlhbA=="| base64 -d
```
