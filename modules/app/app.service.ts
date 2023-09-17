import { injectable } from 'tsyringe';

@injectable()
export class AppService {
    constructor() {}

    getName() {
        console.log('called');

        return 'Surya';
    }
}