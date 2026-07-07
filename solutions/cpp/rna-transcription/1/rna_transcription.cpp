#include "rna_transcription.h"

namespace rna_transcription
{
    char to_rna(char ch)
    {
        if (ch == 'A')
            return 'U';
        else if (ch == 'C')
            return 'G';
        else if (ch == 'G')
            return 'C';
        else if (ch == 'T')
            return 'A';
        throw std::domain_error("Invalid Char !");
    }

    std::string to_rna(const std::string &dna)
    {
        std::string rna{};
        for (char ch : dna)
        {
            if (ch == 'A')
                rna.push_back('U');
            else if (ch == 'C')
                rna.push_back('G');
            else if (ch == 'G')
               rna.push_back('C');
            else if (ch == 'T')
                rna.push_back('A');
        }
        return rna;
    }

}
