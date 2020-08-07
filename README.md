# 🕵️‍♀️ About

This project is composed by an administrative web application and a mobile app for deliverymen.

The web application interface provides administrators tools to control all incoming orders, register, edit and delete deliverymen, recipients, their respective addresses, to assign deliverymen to deliver packages, to check all deliveries' problems and to cancel deliveries due to the severity of provided problems.

Additionally, the mobile application can be used by deliverymen to track pending deliveries and history, report delivery issues and confirm deliveries by uploading the recipient signature.

**Built with:** Node.js, Express.Js, ReactJS, Redux, Redux-Saga, Sequelize ORM, Postgres, Styled components and React Native.

# 📱 Mobile app showcase

<p align="center">
  <img src="./_captures/fast-feet-mobile.gif">
</p>

# 💻 Running locally

## Backend

With your postgres database and redis services running, open your terminal and execute the following commands:

```sh
cd backend
yarn # installs dependencies
yarn sequelize db:migrate # runs migrations
yarn dev # starts development server
```

## Web frontend

```sh
cd frontend
yarn # installs dependencies
yarn start # starts server
```

## Mobile

```sh
cd mobile
yarn # installs dependencies
```

### iOS

```sh
cd ios && pod install
cd .. && yarn ios
```

### Android

```sh
yarn android
```

