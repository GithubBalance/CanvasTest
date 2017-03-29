namespace engine {

    export type Ticker_Listener_Type = (deltaTime: number) => void;

    export class Ticker {

        private static instance: Ticker;

        listeners: Ticker_Listener_Type[] = [];

        static getInstance() {
            if (!Ticker.instance) {
                Ticker.instance = new Ticker();
            }
            return this.instance;
        }

        register(listener: Ticker_Listener_Type) {
            this.listeners.push(listener);
        }

        unregister(listener: Ticker_Listener_Type) {
            
        }

        notify(deltaTime: number) {
            for (let listener of this.listeners) {
                listener(deltaTime);
            }
        }
    }
}


