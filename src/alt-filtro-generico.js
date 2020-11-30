;(function(ng) {
  "use strict";

  ng.module('alt.filtro-generico', [])
    .factory('AltFiltro', [function () {
      var AltFiltro = function(prop, valor) {
          this.propriedade = [];
          this.valor = [];

          if (angular.isDefined(prop)) {
              this.propriedade.push(prop);
          }

          if (angular.isDefined(valor)) {
              this.valor.push(valor);
          }
      };

      AltFiltro.prototype.adiciona = function(propriedade, valor) {
          if (angular.isUndefined(propriedade)) {
              throw new Error('Propriedade deve ser informada para ser adicionada as propriedades.');
          }

          if (angular.isUndefined(valor)) {
              throw new Error('Valor deve ser informado para ser adicionado aos valores.');
          }

          this.propriedade.push(propriedade);
          this.valor.push(valor);
      };

      AltFiltro.prototype.remove = function(propriedade) {
          var _this = this;

          angular.forEach(_this.propriedade, function(p, indice) {
              if (p === propriedade) {
                  _this.propriedade.splice(indice, 1);
                  _this.valor.splice(indice, 1);
              }
          });
      };

      AltFiltro.prototype.removeTodos = function() {
          this.propriedade.length = 0;
          this.valor.length = 0;
      };

      AltFiltro.prototype.estaPreenchido = function() {
          return !!this.propriedade.length && !!this.valor.length;
      };

      AltFiltro.prototype.formata = function() {
          if (!this.estaPreenchido())
              throw new Error('AltFiltro não está preenchido para ser formatado.');

          return {propriedade: this.formataPropriedade(), valor: this.formataValor()};
      };

      AltFiltro.prototype.formataPropriedade = function() {
          if (!this.estaPreenchido())
              throw new Error('Propriedade não está preenchida para ser formatado.');

          return this.propriedade.join();
      };

      AltFiltro.prototype.formataValor = function() {
          if (!this.estaPreenchido())
              throw new Error('Valor não está preenchido para ser formatado.');

          return this.valor.join();
      };

      AltFiltro.prototype.seta = function(propriedade, valor) {
          if (angular.isUndefined(propriedade)) {
              throw new Error('Propriedade deve ser informada para setar a propriedade.');
          }

          if (angular.isUndefined(valor)) {
              throw new Error('Valor deve ser informado para setar o valor.');
          }

          this.remove(propriedade);
          this.adiciona(propriedade, valor);
      };

      AltFiltro.prototype.gerarUrl = function(prefix) {
        var url = '';

        for (var indexFiltro = 0; indexFiltro < this.propriedade.length; indexFiltro++) {
          url += this.propriedade[indexFiltro] + '=' + this.valor[indexFiltro] + '&';
        }

        const finalUrl = url.slice(0, -1); // remove o último '&'

        if (!prefix) {
            return finalUrl;
        }

        return prefix + finalUrl;
      };

      return AltFiltro;
    }]);
}(angular));
