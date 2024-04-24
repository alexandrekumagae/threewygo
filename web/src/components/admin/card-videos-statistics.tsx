import { Card, CardBody, Stat, StatLabel, StatNumber } from "@chakra-ui/react";

interface CardVideosStatisticsProps {
  totalVideosSize: string
}

export function CardVideosStatistics({ totalVideosSize }: CardVideosStatisticsProps) {
  return (
    <Card maxW="sm">
      <CardBody>
        <Stat>
          <StatLabel>Tamanho total ocupado pelos vídeos</StatLabel>
          <StatNumber>{totalVideosSize ? totalVideosSize : '0'} mb</StatNumber>
        </Stat>
      </CardBody>
    </Card>
  )
}