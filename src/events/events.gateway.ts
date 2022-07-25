import { MessageBody, SubscribeMessage, WebSocketGateway, WsResponse } from "@nestjs/websockets"
import { from, Observable } from "rxjs"
import { map } from "rxjs/operators"

@WebSocketGateway({ /* options */ })
export class EventsGateway {
	
	@SubscribeMessage("events")
	findAll(): Observable<WsResponse<number>> {
		return from([1, 2, 3]).pipe(map(item => ({ event: "events", data: item })))
	}
	
	@SubscribeMessage("identity")
	async identity(@MessageBody() data: number): Promise<number> {
		return data
	}
}