import {TranslatorService} from '@app/core/translator/translator.service';
import {Injectable} from '@angular/core';
import {getValue} from '@app/shared/utility/util';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class TranslateService {

  defaultLanguage: string;
  _translations: any;

  constructor(private http: HttpClient, private translator: TranslatorService) {
    this.defaultLanguage = translator.defaultLanguage;
    this.translateModule();
  }

  private translateModule() {
    return this.http.get('./assets/i18n/service-lang-fr.json')
      .subscribe(
                data => this._translations = data,
                err => console.log(err)
            );
  }

  public use(lang: string): void {
    this.defaultLanguage = lang;
  }

  public instant(key: string) {
    return getValue(this._translations, key);
  }

}
