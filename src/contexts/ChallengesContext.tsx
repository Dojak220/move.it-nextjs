import { createContext, useState, ReactNode } from "react"
import challenges from "../../challenges.json";

interface ChallengesProviderProps {
   children: ReactNode;
}

interface Challenge {
   type: 'body' | 'eye';
   description: string;
   amount: number;
}

interface ChallengeContextData {
   level: number;
   currentExperience: number;
   challengesCompleted: number;
   activeChallenge: Challenge;
   experienceToNextLevel: number;
   levelUp: () => void;
   starNewChallenge: () => void;
   resetChallenge: () => void;
}

export const ChallengesContext = createContext({} as ChallengeContextData);

export function ChallengesProvider({ children }: ChallengesProviderProps) {
   const [level, setLevel] = useState(1);
   const [currentExperience, setCurrentExperience] = useState(40);
   const [challengesCompleted, setChallengesCompleted] = useState(0);
   const [activeChallenge, setActiveChallenge] = useState(null);

   const experienceToNextLevel = Math.pow((level + 1) * 4, 2)

   function levelUp() {
      setLevel(level + 1);
   }

   function starNewChallenge() {
      const randomChallengeIndex = Math.floor(Math.random() * challenges.length)
      const challenge = challenges[randomChallengeIndex];

      setActiveChallenge(challenge);
   }

   function resetChallenge() {
      setActiveChallenge(null);
   }

   return (
      <ChallengesContext.Provider value={{
         level,
         currentExperience,
         challengesCompleted,
         activeChallenge,
         experienceToNextLevel,
         levelUp,
         starNewChallenge,
         resetChallenge,
      }}>
         {children}
      </ChallengesContext.Provider>
   )
}