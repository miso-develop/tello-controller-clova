# Tello Conrtoller (Clova�X�L��)

Clova�X�L������g�C�h���[���uTello�v���������삷����@�ł��B  
�����|�W�g���ɂ̓G���h�|�C���g�Ŏ��s����Node.js�v���O���������Clova�X�L���̑Θb���f��TSV���܂݂܂��B  



## �K�v�Ȃ���

* Tello  
* Clova���ڃf�o�C�X (Clova Friends��)  
* PC (Raspberry Pi���ł���)  
* Tello�ڑ��pWi-Fi�|�[�g (USB Wi-Fi�R�l�N�^��)  



## PC��

* git ver2�ȏ�
* Node.js ver8�n
* npm ver5�n
* PC�ɂ̓O���[�o���l�b�g���[�N�ڑ��p��Tello�ւ�Wi-Fi�ڑ��p��2�̃l�b�g���[�N�|�[�g���K�v�ł�  



## �Z�b�g�A�b�v

### �G���h�|�C���g��PC��Ŏ��s

�ȉ��̃R�}���h�����s���G���h�|�C���g��PC��Ŏ��s���܂��B  

```
git clone https://github.com/miso-develop/tello-controller-clova
cd tello-controller-clova

npm install

node index.js
```

### ngrok�̃C���X�g�[���E���s

�ʂ̃^�[�~�i�����N�����A�����|�W�g���̃f�B���N�g���ňȉ��̃R�}���h�����s���܂��B

```
npm install -g ngrok

ngrok http 3000
```

�ȉ��̂悤�Ȍ��ʂ��Ԃ��Ă��܂��̂ŁAhttps��URL���R�s�[���܂��B

```
ngrok by @inconshreveable                                       (Ctrl+C to quit)

Session Status                online
Account                       Miso Tanaka (Plan: Free)
Version                       2.2.8
Region                        United States (us)
Web Interface                 http://127.0.0.1:4040
Forwarding                    http://xxxxxxxx.ngrok.io -> localhost:3000
Forwarding                    https://xxxxxxxx.ngrok.io -> localhost:3000

Connections                   ttl     opn     rt1     rt5     p50     p90
                              0       0       0.00    0.00    0.00    0.00
```

### Clova�X�L���̍쐬

Clova Developer Center�ɂăX�L�����쐬���܂��B  
�r���A�uExtension�T�[�o�[��URL�v�ɂĐ�قǃR�s�[����ngrok��URL����͂��܂��B  

�Θb���f����ʂ܂Ői�񂾂�A�ȉ��̂悤TSV�t�@�C�����A�b�v���[�h���X���b�g���쐬���܂��B  

1. �J�X�^�� �X���b�g�^�C�v��ǉ����܂�
1. slottype��TSV�Ɠ����̃X���b�g������͂��܂�
1. TSV�t�@�C�����A�b�v���[�h
1. �ۑ�
1. ��L���uaction�v�udirection�v�uparticle�v�uunit�v��TSV�ł��ꂼ��J��Ԃ��܂�
1. �r���g�C�� �X���b�g�^�C�v�́uCLOVA.NUMBER�v���ǉ����Ă����܂�

���ɃC���e���g��TSV�t�@�C�����A�b�v���[�h���܂��B  

1. �J�X�^�� �C���e���g��ǉ����܂�
1. �C���e���g���ɁuControllIntent�v�Ɠ��͂��܂�
1. intent��TSV�t�@�C�����A�b�v���[�h
1. �ۑ�
1. �r���h

�ȏ�ŃZ�b�g�A�b�v�͊����ł��B  



### PC��Wi-Fi�ݒ�

PC��USB����Wi-Fi�R�l�N�^��ڑ����܂��B  
����ɂ��PC���̂̃l�b�g���[�N�ɉ����A�����ЂƂl�b�g���[�N���ǉ�����܂��B  
�Е����O���[�o���l�b�g���[�N�ɁA�����Е���Tello�ɐڑ����܂��B  



## �X�L���̎��s

���̏�Ԃ�Clova�X�L�������s����ƁATello����������ł��܂��B  

### ���씭�b

|����|���b��|���l|
|---|---|---|
|����|����<br>���i||
|����|����<br>���n||
|�ړ�|100cm�O�i<br>�E��50cm|�����i20�`200cm ��1�j�ƕ����i�O�㍶�E�j�𓯎��ɓ`���܂��B|
|�㏸/���~|100cm�㏸<br>����50cm|�����i20�`200cm ��1�j�𓯎��ɓ`���܂��B|
|����|90�x�E����<br>����180�x����|�p�x�i1�`360�x�j�ƕ����i���E�j�𓯎��ɓ`���܂��B|
|�t���b�v|�o�b�N�t���b�v<br>�E�t���b�v|�����i�O�㍶�E�j�𓯎��ɓ`���܂��B|

��1 �����̓v���O������200cm�܂łƂ��Ă��܂����A�v���O���������������邱�ƂōŒ�500cm�܂Ŏw��\�ł��B



