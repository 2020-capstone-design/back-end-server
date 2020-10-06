# 오늘 뭐 먹지?

> **UI 서버와 안드로이드에 API를 제공하는 서버**
> '오늘 뭐 먹지? 사장님 광장' 홈페이지에서 등록한 가게 정보는 오늘 뭐먹지? 앱을 사용하는 고객들이 앱으로 확인할 수 있습니다.


<p align="center"><img src="https://user-images.githubusercontent.com/49308628/94784978-ee0d5500-0409-11eb-9412-24acbe12cf33.png" width="400px" height="300px" style="zoom:50%;" text-align="center" /></p>

<p align="center"><img src="https://img.shields.io/badge/npm-6.14.8-red"/> <img src="https://img.shields.io/badge/node-12.16.2-yellowgreen"/> <img src="https://img.shields.io/badge/license-MIT-green"/> </p>

### '오늘 뭐먹지?' 서비스
> 항상 오늘은 뭐 먹을 지 고민하는 대학생들을 위해 시작한 프로젝트입니다.
>
> 대학교 주변에 어떤 음식점에 어떤 메뉴가 있는지 그리고 오늘의 메뉴 추천 기능 서비스를 제공합니다.
>
> 배달 관련 앱에 나오지 않는 식당들도 사용자가 식당 정보를 파악할 수 있습니다.
----
### Domain

**WEB** - https://owner.todaymenu.tk

**API Server** - https://api.todaymenu.tk

**APP** - 개발 진행 중

------
[Front-end github](https://github.com/2020-capstone-design/front-end-server)

------
## Features

👉 **회원가입, 로그인, 로그아웃 기능**

- jwt 사용 (로그인 시 토큰 생성 후 발급)

👉 **아이디 찾기, 비밀번호 찾기 기능**

- 가입 정보를 바탕으로 한 아이디 찾기 기능
- 이메일로 임시 랜덤 비밀번호 전송 기능 ([https://www.npmjs.com/package/nodemailer](https://www.npmjs.com/package/nodemailer))

👉 **가게 정보 등록, 가게 정보 수정, 가게 정보 삭제 기능**

- 카카오 우편번호 API 사용 ([https://spi.maps.daum.net/postcode/guidessl](https://spi.maps.daum.net/postcode/guidessl))
- 이미지 파일 Amazon S3에 저장 ([https://aws.amazon.com/ko/s3/](https://aws.amazon.com/ko/s3/))

👉 **메뉴 정보 등록, 메뉴 정보 수정, 메뉴 정보 삭제 기능**

👉 **정보 Create, Update, Delete 시 토큰 인증 필요**

------

## Node

### 👉 Node installation on Windows

Just go on [official Node.js website](https://nodejs.org/) and download the installer.

Also, be sure to have `git` available in your PATH, `npm` might need it (You can find git [here](https://git-scm.com/)).

### 👉Node installation on Ubuntu

You can install nodejs and npm easily with apt install, just run the following commands.

​	$ sudo apt install nodejs

​	$ sudo apt install npm

### 👉Other Operating Systems

You can find more information about the installation on the [official Node.js website](https://nodejs.org/) and the [official NPM website](https://npmjs.org/).

If the installation was successful, you should be able to run the following command.

​	**$ node --version**

​	**v12.16.2**

​	**$ npm --version**

​	**6.14.8**

If you need to update `npm`, you can make it using `npm`! Cool right? After running the following command, just open again the command line and be happy.

​	$ npm install npm -g

## Setup

Clone this repo to your desktop and run  **npm install**  to install all the dependencies.

------

## Usage

``` 
git clone https://github.com/2020-capstone-design/back-end-server.git
cd your-project-name
npm install (npm i / yarn)
npm start / node app
```

Once the dependencies are installed, you can run npm start to start the application. You will then be able to access it at localhost:3000

------
## Built With

- [Node](https://nodejs.org/ko/)
- [PostgrSQL](https://www.postgresql.org/)
- [AWS S3](https://aws.amazon.com/ko/s3/)
------

## License

> You can check out the full license **[here](https://github.com/2020-capstone-design/backend-server/blob/master/LICENSE)**

This project is licensed under the terms of the **MIT** license.
