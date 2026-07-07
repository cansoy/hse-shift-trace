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
        std::transform(dna.begin(),dna.end(),back_inserter(rna),
                        [](char ch){return to_rna(ch);});
        return rna;
    }

}
