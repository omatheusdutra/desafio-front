import React, { useState } from 'react';
import axios from 'axios';
import SearchBar from '../components/SearchBar';

interface CepResult {
    cep: string;
    logradouro: string;
    localidade: string;
    uf: string;
}

const CepPage: React.FC = () => {
    const [results, setResults] = useState<CepResult[]>([]);

    const fetchCepResults = async (searchTerm: string): Promise<CepResult[]> => {
        try {
            const response = await axios.get(`https://viacep.com.br/ws/${searchTerm}/json/`);
            const searchResults: CepResult[] = [response.data];
            return searchResults;
        } catch (error) {
            console.error('Erro ao buscar CEP:', error);
            return [];
        }
    };

    const handleSearch = async (searchTerm: string) => {
        try {
            const searchResults = await fetchCepResults(searchTerm);
            setResults(searchResults);
        } catch (error) {
            console.error('Erro ao buscar CEP:', error);
        }
    };

    return (
        <div>
            <h1>Busca de CEP por Rua</h1>
            <SearchBar onSearch={handleSearch} />
            <div>
                {results.map((result, index) => (
                    <div key={index}>
                        <p>CEP: {result.cep}</p>
                        <p>Rua: {result.logradouro}</p>
                        <p>Cidade: {result.localidade}</p>
                        <p>Estado: {result.uf}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CepPage;
