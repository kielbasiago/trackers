import { getLogger, Logger } from 'loglevel';
import { SnesSession } from './SnesSession';
import { QueryResultType, Query } from './Query';

export class QueryBuilder {
    private readonly session: SnesSession;
    private readonly logger: Logger;

    constructor(_session: SnesSession) {
        this.session = _session;
        this.logger = getLogger('QueryBuilder');
    }

    public async connect(): Promise<void> {
        await this.session.connect();
    }

    /**
     *
     * @param query
     * @returns void means not ready, otherwise return the promise to the query
     */
    public async send<TQuery extends Query<any>>(query: TQuery): Promise<QueryResultType<TQuery>> {
        const addrs = query.queryAddress;
        const lengths = query.queryLength;

        const pairs = addrs.map((addr, idx) => {
            const hexAddr = addr.toString(16);
            const length = lengths[idx];
            return [hexAddr, length] as [string, number];
        });

        this.logger.info('sending', pairs);

        const responses: Array<Buffer> = [];
        for (let i = 0; i < pairs.length; i++) {
            const [addr, length] = pairs[i];
            const result = await this.session.readRam(addr, length);
            // @ts-expect-error
            responses.push(result); 
        }
        return query.onResponse(responses);
    }
}
