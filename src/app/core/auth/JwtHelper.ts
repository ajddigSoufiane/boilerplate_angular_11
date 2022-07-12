export class JwtHelper {

    public urlBase64Decode( str: string ): string {
        let output = str.replace( /-/g, '+' ).replace( /_/g, '/' );
        switch ( output.length % 4 ) {
            case 0: { break; }
            case 2: { output += '=='; break; }
            case 3: { output += '='; break; }
            default: {
                throw 'Illegal base64url string!';
            }
        }
        return this.b64DecodeUnicode( output );
    }

    // credits for decoder goes to https://github.com/atk
    private b64decode( str: string ): string {
        let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
        let output: string = '';

        str = String( str ).replace( /=+$/, '' );

        if ( str.length % 4 == 1 ) {
            throw new Error( "'atob' failed: The string to be decoded is not correctly encoded." );
        }

        for (
            // initialize result and counters
            let bc: number = 0, bs: any, buffer: any, idx: number = 0;
            // get next character
            buffer = str.charAt( idx++ );
            // character found in table? initialize bit storage and add its ascii value;
            ~buffer && ( bs = bc % 4 ? bs * 64 + buffer : buffer,
                // and if not first of each 4 characters,
                // convert the first 8 bits to one ascii character
                bc++ % 4 ) ? output += String.fromCharCode( 255 & bs >> ( -2 * bc & 6 ) ) : 0
        ) {
            // try to find character in table (0-63, not found => -1)
            buffer = chars.indexOf( buffer );
        }
        return output;
    }

    // https://developer.mozilla.org/en/docs/Web/API/WindowBase64/Base64_encoding_and_decoding#The_Unicode_Problem
    private b64DecodeUnicode( str: any ) {
        return decodeURIComponent( Array.prototype.map.call( this.b64decode( str ), ( c: any ) => {
            return '%' + ( '00' + c.charCodeAt( 0 ).toString( 16 ) ).slice( -2 );
        }).join( '' ) );
    }

    public decodeToken( token: string ): any {
        let parts = token.split( '.' );

        if ( parts.length !== 3 ) {
            throw new Error( 'JWT must have 3 parts' );
        }

        let decoded = this.urlBase64Decode( parts[1] );
        if ( !decoded ) {
            throw new Error( 'Cannot decode the token' );
        }

        return JSON.parse( decoded );
    }

    public getTokenExpirationDate( token: string ): Date {
        let decoded: any;
        decoded = this.decodeToken( token );
        let dateServer: any = new Date( 0 );

        let deltaDateServer: any = 0
        if ( decoded.hasOwnProperty( 'iat' ) ) {
            dateServer.setUTCSeconds( decoded.iat );
            localStorage.setItem( 'dateServer', decoded.iat );


            let now: any = new Date();
            deltaDateServer = this.dateDiff( now, dateServer );
            deltaDateServer = JSON.stringify( deltaDateServer );
        }
        localStorage.setItem( 'deltaDate', deltaDateServer );



        if ( !decoded.hasOwnProperty( 'exp' ) ) {
            return null;
        }

        let date = new Date( 0 ); // The 0 here is the key, which sets the date to the epoch
        date.setUTCSeconds( decoded.exp );

        return date;
    }

    public isTokenExpired( token: string, offsetSeconds?: number ): boolean {
        let date: any = this.getTokenExpirationDate( token );

        let dateExpiration: any = localStorage.getItem( 'dateExpiration' );
        if ( !dateExpiration ) {
            let dateServer: any = new Date( 0 );
            dateServer.setUTCSeconds( localStorage.getItem( 'dateServer' ) );
            let difference = ( date.getTime() - dateServer.getTime() ) / 1000;

            let d: any = new Date();
            d.setSeconds( d.getSeconds() + Math.abs( difference ) );
            localStorage.setItem( 'dateExpiration', d );
            dateExpiration = d;
        }

        offsetSeconds = offsetSeconds || 0;

        if ( dateExpiration == null ) {
            return false;
        }


        return !( new Date(dateExpiration).getTime() >  new Date().getTime() );
    }
    public dateDiff( date1, date2 ) {
        var diff: any = {}                           // Initialisation du retour
        var tmp = date2 - date1;

        tmp = Math.floor( tmp / 1000 );             // Nombre de secondes entre les 2 dates
        diff.sec = tmp % 60;                    // Extraction du nombre de secondes

        tmp = Math.floor(( tmp - diff.sec ) / 60 );    // Nombre de minutes (partie entière)
        diff.min = tmp % 60;                    // Extraction du nombre de minutes

        tmp = Math.floor(( tmp - diff.min ) / 60 );    // Nombre d'heures (entières)
        diff.hour = tmp % 24;                   // Extraction du nombre d'heures

        tmp = Math.floor(( tmp - diff.hour ) / 24 );   // Nombre de jours restants
        diff.day = tmp;
        return diff;
    }
    public dateAdd( date, interval, units ) {
        var ret = new Date( date ); //don't change original date
        var checkRollover = function() { if ( ret.getDate() != date.getDate() ) ret.setDate( 0 ); };
        switch ( interval.toLowerCase() ) {
            case 'year': ret.setFullYear( ret.getFullYear() + units ); checkRollover(); break;
            case 'quarter': ret.setMonth( ret.getMonth() + 3 * units ); checkRollover(); break;
            case 'month': ret.setMonth( ret.getMonth() + units ); checkRollover(); break;
            case 'week': ret.setDate( ret.getDate() + 7 * units ); break;
            case 'day': ret.setDate( ret.getDate() + units ); break;
            case 'hour': ret.setTime( ret.getTime() + units * 3600000 ); break;
            case 'minute': ret.setTime( ret.getTime() + units * 60000 ); break;
            case 'second': ret.setTime( ret.getTime() + units * 1000 ); break;
            default: ret = undefined; break;
        }
        return ret;
    }
}
