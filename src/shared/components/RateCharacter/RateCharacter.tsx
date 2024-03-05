import { StarFilled, StarOutlined } from '@ant-design/icons';

export const RateCharacter = ({ index, rating }: { index?: number; rating: number }) => {
    return index !== undefined && index < Math.round(rating) ? (
        <StarFilled style={{ fontSize: '16px' }} />
    ) : (
        <StarOutlined style={{ color: '#fadb14', fontSize: '16px' }} />
    );
};
