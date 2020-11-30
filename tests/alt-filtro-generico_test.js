'use strict';

describe('Service: AltFiltro', function () {
    var AltFiltro;

    beforeEach(module('alt.filtro-generico'));

    beforeEach(inject(function($injector) {
        AltFiltro = $injector.get('AltFiltro');
    }));

    describe('criação', function() {
        it('deve ter a classe disponível', function() {
            expect(AltFiltro).toBeDefined();
            expect(typeof AltFiltro).toBe("function");
        })

        it('deve ter a instância com as propriedades corretas', function() {
            var _f = new AltFiltro();

            expect(_f.propriedade).toEqual([]);
            expect(_f.valor).toEqual([]);
        });

        it('deve preencher propriedade e valor com o que é passado', function() {
            var _f = new AltFiltro('a', 'b');

            expect(_f.propriedade).toEqual(['a']);
            expect(_f.valor).toEqual(['b']);
        })
    });

    describe('estaPreenchido', function() {
        it('deve retorna false, instancia vazia', function() {
            var _f = new AltFiltro();

            expect(_f.estaPreenchido()).toBeFalsy();
        });

        it('deve retorna true, instancia ok', function() {
            var _f = new AltFiltro();

            _f.adiciona('a', 'b');

            expect(_f.estaPreenchido()).toBeTruthy();
        });
    });

    describe('estaPreenchido', function() {
        it('deve retorna false, instancia vazia', function() {
            var _f = new AltFiltro();

            expect(_f.estaPreenchido()).toBeFalsy();
        });

        it('deve retorna true, instancia ok', function() {
            var _f = new AltFiltro();

            _f.adiciona('a', 'b');

            expect(_f.estaPreenchido()).toBeTruthy();
        });
    });

    describe('adiciona', function() {
        it('deve retornar um erro, propriedade não informada', function() {
            var _f = new AltFiltro();

            expect(function() {
                _f.adiciona(undefined, 'b');
            }).toThrow(new Error('Propriedade deve ser informada para ser adicionada as propriedades.'));
        });

        it('deve retornar um erro, valor não informado', function() {
            var _f = new AltFiltro();

            expect(function() {
                _f.adiciona('a', undefined);
            }).toThrow(new Error('Valor deve ser informado para ser adicionado aos valores.'));
        });

        it('deve adicionar chave e valor nos arrays', function() {
            var _f = new AltFiltro();

            _f.adiciona('a1', 'b');
            _f.adiciona('a2', 'b');
            _f.adiciona('a3', 'b');

            expect(_f.propriedade).toEqual(['a1', 'a2', 'a3']);
            expect(_f.valor).toEqual(['b', 'b', 'b']);
        });
    })

    describe('remove', function() {
        it('não deve remover nada - propriedade não encontrada', function() {
            var _f = new AltFiltro();

            _f.adiciona('a', 1);
            _f.adiciona('b', 2);
            _f.adiciona('c', 3);

            _f.remove('z');

            expect(_f.propriedade.length).toBe(3);
            expect(_f.valor.length).toBe(3);
        })

        it('não deve remover nada - propriedade não encontrada', function() {
            var _f = new AltFiltro();

            _f.adiciona('a', 1);
            _f.adiciona('b', 2);
            _f.adiciona('c', 3);

            _f.remove('b');

            expect(_f.propriedade.length).toBe(2);
            expect(_f.valor.length).toBe(2);

            expect(_f.propriedade[1]).toBe('c');
            expect(_f.valor[1]).toBe(3);
        })
    })

    describe('removeTodos', function() {
        it('deve remover todos', function() {
            var _f = new AltFiltro();

            _f.adiciona('a', 1);
            _f.adiciona('b', 2);
            _f.adiciona('c', 3);

            _f.removeTodos();

            expect(_f.propriedade.length).toBe(0);
            expect(_f.valor.length).toBe(0);
        })

        it('não deve existir erro, nova instância', function() {
            var _f = new AltFiltro();

            expect(function() {
                _f.removeTodos();
            }).not.toThrow();

            expect(_f.propriedade.length).toBe(0);
            expect(_f.valor.length).toBe(0);
        })
    })

    describe('formata', function() {
        it('deve retornar erro, estaPreenchidoRetornaErro', function() {
            var _f = new AltFiltro();

            spyOn(_f, 'estaPreenchido').and.returnValue(false);

            expect(function() {
                _f.formata();
            }).toThrow(new Error('AltFiltro não está preenchido para ser formatado.'));
        });

        it('deve retornar formatar o AltFiltro corretamente', function() {
            var _f = new AltFiltro();

            spyOn(_f, 'estaPreenchido').and.returnValue(true);

            _f.adiciona('a', 1);
            _f.adiciona('b', 2);
            _f.adiciona('c', 3);

            var _r = _f.formata();

            expect(_r).toEqual({propriedade: 'a,b,c', valor: '1,2,3'});
        });
    });

    describe('formataPropriedade', function() {
        it('deve retornar erro, estaPreenchidoRetornaErro', function() {
            var _f = new AltFiltro();

            spyOn(_f, 'estaPreenchido').and.returnValue(false);

            expect(function() {
                _f.formataPropriedade();
            }).toThrow(new Error('Propriedade não está preenchida para ser formatado.'));
        });

        it('deve retornar formatar o AltFiltro corretamente', function() {
            var _f = new AltFiltro();

            spyOn(_f, 'estaPreenchido').and.returnValue(true);

            _f.adiciona('a', 1);
            _f.adiciona('b', 2);
            _f.adiciona('c', 3);

            var _r = _f.formataPropriedade();

            expect(_r).toEqual('a,b,c');
        });
    });

    describe('formataValor', function() {
        it('deve retornar erro, estaPreenchidoRetornaErro', function() {
            var _f = new AltFiltro();

            spyOn(_f, 'estaPreenchido').and.returnValue(false);

            expect(function() {
                _f.formataValor();
            }).toThrow(new Error('Valor não está preenchido para ser formatado.'));
        });

        it('deve retornar formatar o AltFiltro corretamente', function() {
            var _f = new AltFiltro();

            spyOn(_f, 'estaPreenchido').and.returnValue(true);

            _f.adiciona('a', 1);
            _f.adiciona('b', 2);
            _f.adiciona('c', 3);

            var _r = _f.formataValor();

            expect(_r).toEqual('1,2,3');
        });
    });

    describe('seta', function() {
        it('deve retornar um erro, propriedade não informada', function() {
            var _f = new AltFiltro();

            expect(function() {
                _f.seta(undefined, 'b');
            }).toThrow(new Error('Propriedade deve ser informada para setar a propriedade.'));
        });

        it('deve retornar um erro, valor não informado', function() {
            var _f = new AltFiltro();

            expect(function() {
                _f.seta('a', undefined);
            }).toThrow(new Error('Valor deve ser informado para setar o valor.'));
        });

        it('deve setar chave e valor corretamente - AltFiltro estava vazio', function() {
            var _f = new AltFiltro();

            _f.seta('a', 1);

            expect(_f.propriedade[0]).toBe('a');
            expect(_f.valor[0]).toBe(1);
        })

        it('deve setar chave e valor corretamente - deve sempre sobrescrever a chave/valor quando a chave for repetida', function() {
            var _f = new AltFiltro();

            _f.adiciona('a', 1);

            expect(_f.propriedade[0]).toBe('a');
            expect(_f.valor[0]).toBe(1);

            _f.seta('a', 1);

            expect(_f.propriedade[0]).toBe('a');
            expect(_f.valor[0]).toBe(1);

            expect(_f.propriedade[1]).toBeUndefined();
            expect(_f.valor[1]).toBeUndefined();

            _f.seta('b', 1);

            expect(_f.propriedade[1]).toBe('b')
            expect(_f.valor[1]).toBe(1);

            _f.seta('b', 2);

            expect(_f.propriedade[1]).toBe('b')
            expect(_f.valor[1]).toBe(2);
        })
    });

    fdescribe('gerarUrl', function() {
      it('retornando a url esperada', function() {
        var _f = new AltFiltro();

        _f.adiciona('a', 1);
        _f.adiciona('b', 2);
        _f.adiciona('c', 3);

        var _r = _f.gerarUrl();

        expect(_r).toEqual("/?a=1&b=2&c=3");
      });

      it('quando não tem parâmetro', function() {
        var _f = new AltFiltro();

        var _r = _f.gerarUrl();

        expect(_r).toEqual("/");

      })
    })

});
