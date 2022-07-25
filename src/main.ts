import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app.module"
import { FastifyAdapter, NestFastifyApplication } from "@nestjs/platform-fastify"
import { FastifyInstance } from "fastify"
import { promises } from "fs"

const indexHtmlPromise = promises.readFile("./src/index.html");

async function bootstrap() {
	
	const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());
	
	const fastifyInstance = app.getHttpAdapter().getInstance() as FastifyInstance;
	
	fastifyInstance.get("/", (_request, reply)=>{
		reply.type("text/html;charset:utf-8");
		indexHtmlPromise.then((fileBuffered)=>reply.send(fileBuffered));
	});
	
	fastifyInstance.get("*", (request, reply)=>{
		console.log("request handled by fastify", request.url);
		reply.send("Handled by fastify");
	});
	
	await app.listen(3000);
	
	console.log(`Application is running on: ${await app.getUrl()}`);
	
}
bootstrap()