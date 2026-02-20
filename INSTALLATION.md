# Установка и запуск

## Вариант 1: npm (рекомендуется)

```bash
cd kundigungsheld-improved
npm install --legacy-peer-deps
npm run dev
```

## Вариант 2: pnpm

```bash
cd kundigungsheld-improved
pnpm install
pnpm dev
```

## Вариант 3: yarn

```bash
cd kundigungsheld-improved
yarn install
yarn dev
```

Откройте браузер: http://localhost:3000

---

## Решение проблем

### Ошибка ERESOLVE
Если возникают конфликты зависимостей:

**npm:**
```bash
npm install --legacy-peer-deps
```

**pnpm:**
```bash
pnpm install --no-strict-peer-deps
```

**yarn:**
```bash
yarn install --ignore-peer-deps
```

### Порт занят
Если порт 3000 занят:
```bash
npm run dev -- -p 3001
```

---

## Что было исправлено

- Обновлен `react-day-picker` с 8.10.1 на 9.4.4 (поддержка React 19)
- Добавлены `overrides` для npm
- Добавлены расширенные `overrides` для pnpm
