import { Htb } from './htb';

type HtbExport = typeof Htb & { Htb: typeof Htb };
const HtbExport: HtbExport = Htb as HtbExport;
HtbExport.Htb = Htb;

export = HtbExport;
