exports.handler = async function (event, context) {
  // Основная асинхронная функция, которая выполняет логику на сервере.
  const sanitizer = require('sanitize')();
  // Подключаем библиотеку sanitize для очистки входных данных от потенциальных угроз.

  const rawBody = JSON.parse(String(event.body).replace(/'/g, '\'').replace(/\\'/g,"'"));
  // Получаем тело запроса, парсим JSON и удаляем лишние экранированные кавычки.

  const { email, name, message } = sanitizer.primitives(rawBody);
  // Извлекаем и очищаем входные данные (email, имя и сообщение) с помощью sanitizer.

  if (!email || !message || !name) {
      // Если email, имя или сообщение отсутствуют — выводим сообщение в консоль и возвращаем ошибку 400.
      console.log('email or message empty');
      console.log('email', email);
      console.log('name', name);
      console.log('message', message);
      return {
          statusCode: 400,
          // Возвращаем статус 400 — ошибка клиента, если обязательные поля пусты.
      };
  }

  const text = `Sender: ${email}. Name: ${name}. Message: ${message}`;
  // Формируем текстовую версию сообщения для отправки.

  const html = `
                  <h1>Message from ${name}</h1>
                  <h2>Sender:</h2>
                  <p>Name: <b>${name}</b></p>
                  <p>Email: <b>${email}</b></p>
                  <h2>Message:</h2>
                  <p>${message}</p>
              `;
  // Формируем HTML-версию сообщения для отправки по email.

  const sgMail = require('@sendgrid/mail');
  // Подключаем библиотеку SendGrid для отправки писем.

  sgMail.setApiKey(process.env.NETLIFY_EMAILS_PROVIDER_API_KEY);
  // Устанавливаем API-ключ для аутентификации с SendGrid (ключ хранится в переменной окружения).

  const msg = {
    to: process.env.SEND_GRID_RECIPENT, // Указываем получателя письма (значение из переменной окружения).
    from: process.env.SEND_GRID_VERIFIED_SENDER, // Указываем отправителя письма (значение из переменной окружения).
    subject: 'Message from Hello@jacobduvander.se', // Тема письма.
    text, // Текстовая версия сообщения.
    html // HTML-версия сообщения.
  };

  await sgMail
    .send(msg)
    .then(() => {
      // Если письмо успешно отправлено — выводим сообщение в консоль.
      console.log('Email sent');
    })
    .catch((error) => {
      // Если произошла ошибка — выводим сообщение и логируем ошибку.
      console.log('something happened');
      console.error(error);
    });

  return {
      statusCode: 200,
      // Возвращаем успешный статус 200 после успешной отправки письма.
  };
};
