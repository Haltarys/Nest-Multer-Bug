# Nest-Multer-Bug

A repo that illustrates a potential bug in [NestJS](https://nestjs.com/)

## Setup

```bash
git clone git@github.com:Haltarys/Nest-Multer-Bug.git
npm i
npm run start:dev
```

To upload a file, run (in another terminal):

```bash
curl localhost:3000/image/upload -F "file=@./nest-cli.json"
```

## Description of the bug

When uploading a file to the application (launched with `npm run start:dev`), after a few seconds, the app reloads as if a change to a source file ocurred and gets stuck at `File change detected. Starting incremental compilation...`. This happens even if the file is saved in a directory that is not in `src`.

## Details

This example is based on the documentation on [how to upload a file](https://docs.nestjs.com/techniques/file-upload).
In order to save a file to the disk you need to add the following lines of code to the imports of the `AppModule`.

```ts
MulterModule.register({
  dest: './upload',
});
```

Note that `./upload` is relative to the root directory, not `src`.

Extract from `app.module.ts`:

```ts
@Module({
  imports: [
    MulterModule.register({
      dest: './upload',
    }),
    ImageModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
```

However, if this code is added to a sub-module of `AppModule` (namely `ImageModule`), the auto-reload triggers every time a file is uploaded to the endpoint.

The file is uploaded and saved regardless of the method used.

The auto-reload does not trigger with a simple POST request:

```bash
curl localhost:3000/image/upload -X POST
```
