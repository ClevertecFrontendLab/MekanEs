import { StarFilled, StarOutlined } from '@ant-design/icons';

export const RateCharacter = ({ index, rating }: { index: number | undefined; rating: number }) => {
    return index !== undefined && index < rating ? (
        <StarFilled />
    ) : (
        <StarOutlined style={{ color: '#fadb14' }} />
    );
};
